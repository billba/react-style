import {_AppAction} from "actions";

type Typify<A> = A extends Record<infer T, any> ? T extends string ? { type: T } & A[T] : never : never;

type AppAction = Typify<_AppAction>;

export { AppAction }
