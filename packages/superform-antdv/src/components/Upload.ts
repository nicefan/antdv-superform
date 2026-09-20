import { Upload } from 'antdv-next'
import { h } from 'vue'
import type { UIRenderers } from 'superform/sdk'
export const renderUpload: UIRenderers['upload'] = (props, slots) => h(Upload, props, slots)
