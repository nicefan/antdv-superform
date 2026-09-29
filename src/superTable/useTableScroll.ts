import type { Ref } from 'vue'
import { ref, unref, nextTick, watch, onUnmounted } from 'vue'
import { getViewportOffset } from '../utils/dom'
import { debounce } from 'lodash-es'
import { getUIService } from '../adapter'

export function useTableScroll(
  option: Obj,
  dataRef: Ref<any>,
  wrapRef: Ref<HTMLElement | null>,
  abortController?: AbortController
) {
  const { selectors, scrollHeightScope } = getUIService('table')
  const query = (root: Element, selector?: string) =>
    selector ? (root.querySelector(selector) as HTMLElement | null) : null
  const debounceRedoHeight = debounce(redoHeight, 100)

  const getScrollRef = ref<any>({})

  let beResize = false
  let resizeObserver: ResizeObserver | undefined
  let observedContent: HTMLElement | null = null
  const stopWatches: (() => void)[] = []
  const fixedStyles = new Map<HTMLElement, { height: string; overflowY: string }>()
  function clearFixedHeight() {
    fixedStyles.forEach((style, el) => Object.assign(el.style, style))
    fixedStyles.clear()
  }
  function applyFixedHeight(el: HTMLElement, height: number, hideOverflow = false) {
    if (!fixedStyles.has(el)) fixedStyles.set(el, { height: el.style.height, overflowY: el.style.overflowY })
    el.style.height = `${height}px`
    if (hideOverflow) el.style.overflowY = 'hidden'
  }
  const listenResize = () => {
    if (beResize) {
      debounceRedoHeight()
      return
    }
    beResize = true
    // 视口高度变化不一定改变容器尺寸，需要独立监听窗口。
    window.addEventListener('resize', debounceRedoHeight, { signal: abortController?.signal })
    document.addEventListener('redoHeight', debounceRedoHeight)
    getScrollRef.value = option.attrs?.scroll
    stopWatches.push(
      watch(
        () => [dataRef.value, unref(dataRef)?.length, option.maxHeight, option.fixedHeight, option.heightOffset],
        () => debounceRedoHeight(),
        { flush: 'post' }
      ),
      watch(
        wrapRef,
        (el, _previous, onCleanup) => {
          if (el) {
            const overflow = el.style.overflow
            el.style.overflow = 'hidden'
            resizeObserver = new ResizeObserver(() => debounceRedoHeight())
            resizeObserver.observe(el)
            // 父容器可能独立于表格伸缩，继承高度不能只观察表格自身。
            if (el.parentElement) resizeObserver.observe(el.parentElement)
            onCleanup(() => {
              el.style.overflow = overflow
              resizeObserver?.disconnect()
              observedContent = null
              clearFixedHeight()
            })
          }
        },
        { immediate: true, flush: 'post' }
      )
    )
  }
  function stopResize() {
    beResize = false
    window.removeEventListener('resize', debounceRedoHeight)
    document.removeEventListener('redoHeight', debounceRedoHeight)
    resizeObserver?.disconnect()
    stopWatches.forEach((stop) => stop())
    stopWatches.length = 0
    clearFixedHeight()
    debounceRedoHeight.cancel()
    getScrollRef.value = unref(option.attrs?.scroll)
  }
  onUnmounted(stopResize)

  function redoHeight() {
    if (!beResize) return
    // 手动重算会覆盖已排队的内部重算，并将完成时机交给调用者。
    debounceRedoHeight.cancel()
    return calcTableHeight()
  }

  function setHeight(height: number | null, chromeHeight: number) {
    getScrollRef.value = {
      x: '100%',
      ...unref(option.attrs?.scroll),
      y: height == null ? null : height + (scrollHeightScope === 'table' ? chromeHeight : 0),
    }
  }

  async function calcTableHeight() {
    await nextTick()
    // 等待 DOM 更新期间可能卸载，测量前重新读取当前容器。
    if (!beResize) return
    const { maxHeight, fixedHeight, heightOffset } = option
    if (maxHeight == null) return
    const wrapEl = unref(wrapRef)
    if (!wrapEl?.isConnected || !wrapEl.parentElement) return

    const tableEl = query(wrapEl, selectors.table)
    if (!tableEl) return
    // 关闭固定高度时恢复原样式，避免旧高度影响后续自然布局。
    if (!fixedHeight) clearFixedHeight()

    const parentEl = wrapEl.parentElement
    const outerStyle = getComputedStyle(parentEl)
    const tableView = getViewportOffset(tableEl)
    // 累计表格到根容器的底部内边距与边框，兼容查询区和非对称内边距。
    let paddingHeight = 0
    for (let el = tableEl.parentElement; el; el = el.parentElement) {
      const style = getComputedStyle(el)
      paddingHeight += (parseFloat(style.paddingBottom) || 0) + (parseFloat(style.borderBottomWidth) || 0)
      if (el === wrapEl) break
    }
    const outerPadding = (parseFloat(outerStyle.marginBottom) || 0) + (parseFloat(outerStyle.paddingBottom) || 0)
    let bottomIncludeBody = 0
    if (maxHeight === 'parent') {
      // 使用父元素内容区底边，避免将表格内容撑出的自身高度误当成可用高度。
      const parentBottom = parentEl.getBoundingClientRect().top + parentEl.clientTop + parentEl.clientHeight
      const wrapStyle = getComputedStyle(wrapEl)
      bottomIncludeBody =
        parentBottom -
        (parseFloat(outerStyle.paddingBottom) || 0) -
        tableView.top -
        (parseFloat(wrapStyle.marginBottom) || 0)
    } else {
      bottomIncludeBody = tableView.bottomIncludeBody - outerPadding // 去掉一个页面底部边距
    }
    const titleEl = query(tableEl, selectors.title)
    const headerHeight = titleEl?.parentElement === tableEl ? titleEl.offsetHeight ?? 0 : 0
    const headEl = query(tableEl, selectors.header)
    // 隐藏表头时没有对应节点，仍需计算行区域高度。
    const headerCellHeight = headEl?.offsetHeight ?? 0
    let footerHeight = 0
    const footerEl = query(tableEl, selectors.footer)
    if (footerEl) {
      footerHeight += footerEl.offsetHeight || 0
    }
    let paginationHeight = 0
    // 可用高度从表格顶部计算，上方分页已占据布局空间，只扣除表格下方的分页。
    if (selectors.pagination) {
      const tableTop = tableEl.getBoundingClientRect().top
      wrapEl.querySelectorAll<HTMLElement>(selectors.pagination).forEach((paginationEl) => {
        if (paginationEl.offsetHeight && paginationEl.getBoundingClientRect().top >= tableTop) {
          paginationHeight += paginationEl.offsetHeight + 16
        }
      })
    }

    // 表格最大高度
    const availableHeight = Math.max(
      0,
      Math.floor(bottomIncludeBody) - (heightOffset || 0) - paddingHeight - paginationHeight
    )

    // 表格行滚动高度
    const chromeHeight = footerHeight + headerHeight + headerCellHeight + 1
    // 数字直接限定行区域；只有 viewport/parent 需要扣除非内容区域及额外偏移。
    const innerHeight = Math.max(0, typeof maxHeight === 'number' ? maxHeight : availableHeight - chromeHeight)
    const tableHeight = innerHeight + chromeHeight

    if (fixedHeight) {
      applyFixedHeight(tableEl, tableHeight, true)
      if (!(unref(dataRef)?.length > 0)) {
        const emptyEl = query(tableEl, selectors.empty)
        if (emptyEl) {
          const emptyCell = query(tableEl, selectors.emptyCell)
          if (emptyCell) applyFixedHeight(emptyCell, Math.max(0, innerHeight - 16))
        }
      }
    }
    const contentEl = query(tableEl, selectors.bodyContent)
    if (contentEl !== observedContent) {
      if (observedContent) resizeObserver?.unobserve(observedContent)
      observedContent = contentEl
      // 固定外观高度下，翻页、展开行和单元格换行仍会改变内容高度。
      if (contentEl) resizeObserver?.observe(contentEl)
    }
    if (contentEl) {
      // AntDV 有 y 就强制展示纵向滚动条；tbody 在首次渲染和取消 y 后都存在。
      // 横向滚动条也占用行区域高度，比较时需一并计入。
      const bodyEl = query(tableEl, selectors.body)
      const bodyStyle = bodyEl && getComputedStyle(bodyEl)
      const scrollbarHeight =
        bodyEl && bodyStyle
          ? Math.max(
              0,
              bodyEl.offsetHeight -
                bodyEl.clientHeight -
                (parseFloat(bodyStyle.borderTopWidth) || 0) -
                (parseFloat(bodyStyle.borderBottomWidth) || 0)
            )
          : 0
      const needsScroll =
        unref(dataRef)?.length > 0 && contentEl.getBoundingClientRect().height + scrollbarHeight > innerHeight
      setHeight(needsScroll ? innerHeight : null, chromeHeight)
    } else {
      setHeight(innerHeight, chromeHeight)
    }
  }

  return { getScrollRef, redoHeight, debounceRedoHeight, listenResize, stopResize }
}
