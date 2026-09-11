import { nanoid } from 'nanoid'
import { toRaw } from 'vue'

type RowKeyGetter = string | ((record: Obj) => PropertyKey)

export function useRowKey(keyField?: RowKeyGetter) {
  const keyMap = new WeakMap<Obj, PropertyKey>()

  const getKey = (record: Obj): PropertyKey => {
    const raw = toRaw(record)

    if (keyMap.has(raw)) {
      return keyMap.get(raw)!
    }

    const value = typeof keyField === 'function' ? keyField(record) : keyField ? record[keyField] : undefined

    const key = value !== undefined && value !== null && value !== '' ? value : nanoid(12)
    keyMap.set(raw, key)
    return key
  }

  const setKey = (record: Obj, key: PropertyKey) => {
    keyMap.set(toRaw(record), key)
  }

  const hasKey = (record: Obj) => keyMap.has(toRaw(record))

  return { getKey, setKey, hasKey }
}
