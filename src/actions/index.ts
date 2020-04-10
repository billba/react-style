import {GreetingAction} from "./greeting";
import {LocationAction} from './location';
// add other actions here

type Typify<A> = A extends Record<infer T, any> ? T extends string ? { type: T } & A[T] : never : never;

export type AppAction = Typify<
& GreetingAction
& LocationAction
>
// add other actions here
