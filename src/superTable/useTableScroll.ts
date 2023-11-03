import type { Ref } from 'vue'
import { ref, computed, unref, nextTick, watch, onMounted, onUnmounted } from 'vue'
import { getViewportOffset } from '../utils/dom'
import { debounce } from 'lodash-es'

export function useTableScroll(option: Obj, dataRef: Ref<Obj[]>, wrapRef: Ref<HTMLElement | null>) {
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

    window.addEventListener('resize', debounceRedoHeight)
    onUnmounted(() => {
      window.removeEventListener('resize', debounceRedoHeight)
    })
  }

  function redoHeight() {
    nextTick(() => {
      calcTableHeight()
    })
  }

  function setHeight(height: number | null) {
    scrollHeightRef.value = height
    //  Solve the problem of modal adaptive height calculation when the form is placed in the modal
    // modalFn?.redoModalHeight?.();
  }

  async function calcTableHeight() {
    const tableData = unref(dataRef)

    const wrapEl = unref(wrapRef)
    if (!wrapEl) return

    const tableEl = wrapEl.querySelector('.ant-table') as HTMLElement
    if (!tableEl) return

    // bodyEl!.style.height = 'unset';

    await nextTick()

    // Table height from bottom height-custom offset
    const paddingHeight = option.isContainer ? 16 : 0

    const tableView = getViewportOffset(tableEl)
    const wrapView = getViewportOffset(wrapEl)
    let bottomIncludeBody = 0
    if (wrapEl && inheritHeight) {
      bottomIncludeBody = wrapView.bottomIncludeBody - wrapView.bottom - (tableView.top - wrapView.top)
    } else {
      // Table height from bottom
      bottomIncludeBody = tableView.bottomIncludeBody - 20 // 去掉一个页面底部边距
    }

    const headerHeight = (tableEl.querySelector('.ant-table-title') as HTMLElement)?.offsetHeight ?? 0
    const headEl = tableEl.querySelector('.ant-table-thead ')
    if (!headEl) return

    // Add a delay to get the correct bottomIncludeBody paginationHeight footerHeight headerHeight
    let headerCellHeight = 0
    if (headEl) {
      headerCellHeight = (headEl as HTMLElement).offsetHeight
    }
    let footerHeight = 0
    const footerEl = tableEl.querySelector('.ant-table-footer') as HTMLElement
    if (footerEl) {
      footerHeight += footerEl.offsetHeight || 0
    }
    // Pager height
    let paginationHeight = 0
    const paginationEl = wrapEl.querySelector('.ant-pagination') as HTMLElement
    if (paginationEl) {
      paginationHeight = paginationEl.offsetHeight + 16
    }

    // 表格最大高度
    let tableHeight = bottomIncludeBody - (resizeHeightOffset || 0) - paddingHeight - paginationHeight

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
        const emptyEl = tableEl.querySelector('.ant-empty')?.parentElement as HTMLElement
        if (emptyEl) {
          emptyEl!.style.height = innerHeight + 'px'
        }
        return
      }
    }
    if (tableEl.scrollHeight > tableHeight) {
      setHeight(innerHeight)
    } else {
      const bodyEl = tableEl.querySelector('.ant-table-body')
      if (bodyEl) {
        setHeight(bodyEl.scrollHeight <= innerHeight ? null : innerHeight)
      }
    }
  }
  // useResizeObserver(tableEl, (entries) => {
  //   debounceRedoHeight();
  // });

  const getScrollRef = computed(() => {
    const tableHeight = unref(scrollHeightRef)

    return {
      y: tableHeight,
      // scrollToFirstRowOnChange: false,
      ...scroll,
    }
  })

  return { getScrollRef, redoHeight }
}
