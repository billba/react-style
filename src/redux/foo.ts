import { Reducer } from '.';

interface FooState {
  thing: number,
  widget: string,
}

export type FooAction = 
| {
  type: 'AccomplishSomething',
  thing: number,
}
  
export const foo: Reducer<FooState> = (
  foo = { thing: 123, widget: 'hello' },
  action,
) => {
  switch (action.type) {
    case 'AccomplishSomething':
      return {
        ... foo,
        thing: action.thing,
      }
    default:
      return foo;
  }
}