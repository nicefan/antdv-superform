import { h } from 'vue'

// 统一用 currentColor 和 em 尺寸，让内置图标自然继承所在按钮、标签或提示的样式。
function createIcon(paths: string[], spinning = false, canvas: { viewBox: string; strokeWidth: number; fill?: string } = { viewBox: '0 0 24 24', strokeWidth: 1.8 }) {
  return () => h('svg', {
    viewBox: canvas.viewBox, width: '1em', height: '1em', fill: canvas.fill ?? 'none',
    stroke: 'currentColor', 'stroke-width': canvas.strokeWidth, 'stroke-linecap': 'round',
    'stroke-linejoin': 'round', 'aria-hidden': 'true', focusable: 'false',
    style: { display: 'inline-block', verticalAlign: '-0.125em', flexShrink: 0 },
  }, [
    h('g', [
      ...paths.map((d) => h('path', { d })),
      ...(spinning ? [h('animateTransform', {
        attributeName: 'transform', type: 'rotate', from: '0 12 12',
        to: '360 12 12', dur: '1s', repeatCount: 'indefinite',
      })] : []),
    ]),
  ])
}

/** 框架无关的默认图标，供 Core 动作和官方 Adapter 共用。 */
export const builtInIcons = {
  add: createIcon(['M12 5v14M5 12h14']),
  remove: createIcon(['M5 12h14']),
  delete: createIcon(['M4 7h16M9 7V4h6v3M6 7l1 14h10l1-14M10 11v6M14 11v6']),
  edit: createIcon(['M14 5l5 5M4 20l5-1L21 7l-5-5L4 14z']),
  detail: createIcon(['M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12z', 'M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0']),
  submit: createIcon(['M3 11L21 3l-8 18-3-7zM10 14L21 3']),
  search: createIcon(['M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0M15 15l6 6']),
  reset: createIcon(['M4 10a8 8 0 1 1 1 8M4 4v6h6']),
  // 统一使用 16px 网格，直线落在半像素上；不再分别裁切画布后缩放描边。
  refresh: createIcon(['M14.5 3v4h-4', 'M14.5 7a7 7 0 1 0-1.5 5.3'], false, { viewBox: '0 0 16 16', strokeWidth: 1 }),
  density: createIcon(['M2.5.5h11M2.5 15.5h11M8.5 4v8M6.5 6l2-2 2 2M6.5 10l2 2 2-2'], false, { viewBox: '0 0 16 16', strokeWidth: 1 }),
  columnSetting: createIcon(['M6.5.5h3l.5 2 1.5.9 2-.5 1.5 2.6-1.5 1.4v2.2l1.5 1.4-1.5 2.6-2-.5-1.5.9-.5 2h-3l-.5-2-1.5-.9-2 .5L1 10.5l1.5-1.4V6.9L1 5.5l1.5-2.6 2 .5 1.5-.9z', 'M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0'], false, { viewBox: '0 0 16 16', strokeWidth: 1 }),
  // 用实心圆保证小尺寸拖动标识可见，避免极短描边被浏览器省略。
  dragHandle: () => h('svg', {
    viewBox: '0 0 16 16', width: '1em', height: '1em', fill: 'currentColor',
    'aria-hidden': 'true', focusable: 'false',
  }, [3, 8, 13].flatMap((cy) => [5, 11].map((cx) => h('circle', { cx, cy, r: 1.25 })))),
  fixLeft: createIcon(['M11 0h1v16h-1zM3 4l5 4-5 4z'], false, { viewBox: '0 0 16 16', strokeWidth: 0, fill: 'currentColor' }),
  fixRight: createIcon(['M4 0h1v16H4zM13 4L8 8l5 4z'], false, { viewBox: '0 0 16 16', strokeWidth: 0, fill: 'currentColor' }),
  more: createIcon(['M5 12h.01M12 12h.01M19 12h.01']),
  expand: createIcon(['M5 9l7 7 7-7']),
  collapse: createIcon(['M5 15l7-7 7 7']),
  info: createIcon(['M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M12 11v6M12 7h.01']),
  upload: createIcon(['M12 16V3M7 8l5-5 5 5M4 15v6h16v-6']),
  attachment: createIcon(['M8 13l7-7a3 3 0 0 1 4 4L9 20a5 5 0 0 1-7-7L13 2M6 15l8-8']),
  loading: createIcon(['M20 12a8 8 0 1 1-8-8'], true),
  sync: createIcon(['M4 10a8 8 0 0 1 14-4l2 3M20 3v6h-6M20 14a8 8 0 0 1-14 4l-2-3M4 21v-6h6']),
  error: createIcon(['M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0M8 8l8 8M16 8l-8 8']),
}
