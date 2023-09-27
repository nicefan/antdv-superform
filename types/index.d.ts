type Obj<T = any> = Record<string, T>
type Cls<T = any> = new (...args: any[]) => T
type Fn<T = any> = (...args: any) => T
type AsyncFn<T extends any[] = any, R = any> = (...args: T) => Promise<R>
type Ref<T = any> = import('vue').Ref<T>
