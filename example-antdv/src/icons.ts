import { h } from 'vue'

// 示例提供图标渲染函数；使用 .vue 组件时以 () => h(Icon) 包装。
function icon(path: string) {
  return () => h('svg', {
    viewBox: '0 0 24 24', width: '1em', height: '1em', fill: 'none',
    stroke: 'currentColor', 'stroke-width': 1.8, 'stroke-linecap': 'round',
    'stroke-linejoin': 'round', 'aria-hidden': 'true',
    style: { verticalAlign: '-0.125em' },
  }, [h('path', { d: path })])
}

export const UserIcon = icon('M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M4 21v-3a8 8 0 0 1 16 0v3')
export const SearchIcon = icon('M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0M15 15l6 6')
export const LeafIcon = icon('M4 20C1 8 9 3 21 3c0 12-5 20-17 17zM4 20L16 8')
export const RobotIcon = icon('M5 7h14v13H5zM12 7V3M10 3h4M8 11h1M15 11h1M9 16h6M2 10v7M22 10v7')
export const EditIcon = icon('M14 5l5 5M4 20l5-1L21 7l-5-5L4 14z')
export const SyncIcon = icon('M4 10a8 8 0 0 1 14-4l2 3M20 3v6h-6M20 14a8 8 0 0 1-14 4l-2-3M4 21v-6h6')
export const MoreIcon = icon('M5 12h.01M12 12h.01M19 12h.01')
