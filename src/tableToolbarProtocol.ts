import type { VNodeChild } from 'vue'

export type UITableToolName = 'refresh' | 'density' | 'columnSetting'
export type UITableDensity = 'small' | 'middle' | 'large'

export interface UITableToolbarColumn {
  key: string
  title?: unknown
  fixed?: 'left' | 'right'
}

/** Core 提供表格视图状态，Adapter 只负责具体工具栏交互和外观。 */
export interface UITableToolbarProps {
  tools: UITableToolName[]
  density: UITableDensity
  columns: UITableToolbarColumn[]
  visibleKeys: string[]
  onReload?: () => unknown
  onDensityChange: (density: UITableDensity) => void
  onVisibleKeysChange: (keys: string[]) => void
  onColumnOrderChange: (keys: string[]) => void
  onColumnFixedChange: (key: string, fixed: 'left' | 'right' | undefined) => void
  onResetColumns: () => void
}

declare module './adapter/types' {
  interface UITableRenderProps {
    /** Core 统一的密度语义，由 Adapter 转为原生 Table size。 */
    density?: UITableDensity
  }

  interface UIRenderers {
    tableToolbar: (props: UITableToolbarProps) => VNodeChild
  }
}

declare module './exaTypes' {
  interface TableSchemaProps {
    /** 独立表格工具栏；未配置时保持当前无工具栏行为。 */
    tableTools?: false | UITableToolName[]
  }

  interface RootTableOption {
    /** 独立表格工具栏；Core 持有状态，Adapter 负责渲染。 */
    tableTools?: false | UITableToolName[]
  }
}
