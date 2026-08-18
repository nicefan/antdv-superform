export function findRowIndex<T>(list: T[], target: T, rowKey: (record: T) => PropertyKey) {
  const targetKey = rowKey(target)
  return list.findIndex((record) => record === target || rowKey(record) === targetKey)
}
