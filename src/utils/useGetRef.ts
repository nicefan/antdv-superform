import { ref, watch } from 'vue'

function usePromise() {
  let resolve
  const promise = new Promise((_resolve) => {
    resolve = _resolve
  })
  return { promise, resolve }
}
export function useGetRef() {
  const formRef = ref()
  let status = usePromise()
  let waiting = true
  watch(formRef, (form) => {
    if (form) {
      status.resolve(true)
      waiting = false
    } else if (!waiting) {
      // formRef清理后，重建promise.
      status = usePromise()
      waiting = true
    }
  })
  const getForm = () => status.promise.then(() => formRef.value)
  return [formRef, getForm] as const
}
