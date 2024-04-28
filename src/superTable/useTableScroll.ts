import type { Ref } from 'vue'
import { ref, computed, unref, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { getViewportOffset } from '../utils/dom'
import { debounce } from 'lodash-es'

export function useTableScroll(option: Obj, dataRef: Ref<Obj[]>, wrapRef: Ref<HTMLElement | null>,abortController?: AbortController) {
  const scrollHeightRef: Ref<number | null> = ref(null)
  // const modalFn = useModalContext();

  // Greater than animation time 280
  const debounceRedoHeight = debounce(redoHeight, 100)

  const {
    maxHeight,
    isScanHeight = true,
    inheritHeight,
    isFixedHeight,
    resizeHeightOffset,
    attrs: { scroll },
  } = option

  if (isScanHeight || inheritHeight || maxHeight) {
    watch(
      () => [wrapRef.value, unref(dataRef)?.length],
      () => {
        debounceRedoHeight()
      },
      {
        flush: 'post',
      }
    )
    // onMounted(() => {
    //   redoHeight()
    // })
    if (abortController) {
      window.addEventListener('resize', debounceRedoHeight, { signal: abortController.signal })
    } else {
      window.addEventListener('resize', debounceRedoHeight)
      onUnmounted(() => {
        window.removeEventListener('resize', debounceRedoHeight)
      })
    }
  }

  function redoHeight() {
    nextTick(() => {
      calcTableHeight()
    })
  }

  const getScrollRef = ref(scroll)

  function setHeight(height: number | null) {
    scrollHeightRef.value = height
    // modalFn?.redoModalHeight?.();
    getScrollRef.value = {
      y: height,
      // x: 'auto',
      scrollToFirstRowOnChange: true,
      ...scroll,
    }
  }

  async function calcTableHeight() {
    const tableData = unref(dataRef)

    const wrapEl = unref(wrapRef)
    if (!wrapEl) return

    const tableEl = wrapEl.querySelector('.ant-table') as HTMLElement
    if (!tableEl) return

    // bodyEl!.style.height = 'unset';

    await nextTick()

    const outerStyle = getComputedStyle(wrapEl.parentElement as HTMLElement)
    const tableView = getViewportOffset(tableEl)
    const wrapView = getViewportOffset(wrapEl)
    // Table height from bottom height-custom offset
    const paddingHeight = tableView.left - wrapView.left
    const outerPadding = (parseInt(outerStyle.marginBottom) || 0) + (parseInt(outerStyle.paddingBottom) || 0)
    let bottomIncludeBody = 0
    if (wrapEl && inheritHeight) {
      bottomIncludeBody = wrapView.bottomIncludeBody - wrapView.bottom - (tableView.top - wrapView.top)
    } else {
      // Table height from bottom
      bottomIncludeBody = tableView.bottomIncludeBody - outerPadding // 去掉一个页面底部边距
    }
    const titleEl = tableEl.querySelector('.ant-table-title') as HTMLElement
    const headerHeight = titleEl?.parentElement === tableEl ? titleEl.offsetHeight ?? 0 : 0
    const headEl = tableEl.querySelector('.ant-table-thead ')
    if (!headEl) return

    // Add a delay to get the correct bottomIncludeBody paginationHeight footerHeight headerHeight
    let headerCellHeight = 0
    if (headEl) {
      headerCellHeight = (headEl as HTMLElement).offsetHeight
    }
    let footerHeight = 0
    const footerEl = tableEl.querySelector('.ant-table-footer') as HTMLElement
    if (footerEl && footerEl.parentElement === tableEl) {
      footerHeight += footerEl.offsetHeight || 0
    }
    // Pager height
    let paginationHeight = 0
    const paginationEl = wrapEl.querySelector('.ant-pagination') as HTMLElement
    if (paginationEl) {
      paginationHeight = paginationEl.offsetHeight + 16
    }

    // 表格最大高度
    let tableHeight = Math.ceil(bottomIncludeBody) - (resizeHeightOffset || 0) - paddingHeight - paginationHeight

    // 表格行滚动高度
    const innerHeight = maxHeight || tableHeight - footerHeight - headerHeight - headerCellHeight - 1

    // 计算指定固定高度时表格最大高度
    if (maxHeight && isFixedHeight) {
      tableHeight = maxHeight + footerHeight + headerHeight + headerCellHeight + 1
    }

    if (isFixedHeight) {
      tableEl!.style.height = `${tableHeight}px`
      tableEl.style['overflow-y'] = 'hidden'
      if (!inheritHeight) {
        wrapEl.style.height = 'unset'
      }
      if (!unref(tableData) || tableData.length === 0) {
        const emptyEl = tableEl.querySelector('.ant-empty')
        if (emptyEl) {
          const emptyCell = tableEl.querySelector('.ant-table-tbody .ant-table-cell') as HTMLElement
          emptyCell!.style.height = `${innerHeight}px`
        }
        return
      }
    }
    if (tableEl.scrollHeight > tableHeight) {
      setHeight(innerHeight)
    } else {
      const bodyEl = tableEl.querySelector('.ant-table-body') as HTMLElement
      if (bodyEl) {
        setHeight(bodyEl.scrollHeight <= innerHeight ? null : innerHeight)
      }
    }
  }
  // useResizeObserver(tableEl, (entries) => {
  //   debounceRedoHeight();
  // });

  return { getScrollRef, redoHeight, debounceRedoHeight }
}
