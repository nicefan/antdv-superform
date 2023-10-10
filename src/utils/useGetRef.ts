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
  watch(formRef, (form) => {
    if (form) {
      status.resolve(true)
    } else {
      // formRef清理后，重建promise.
      status = usePromise()
    }
  })
  const getForm = () => status.promise.then(() => formRef.value)
  return [formRef, getForm] as const
}
