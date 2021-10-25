/// <reference types="./ExaForm" />
type Obj<T = any> = Record<string, T>
type Cls<T = any> = new (...args: any[]) => T
type Fn<T = any> = (...args: any) => T