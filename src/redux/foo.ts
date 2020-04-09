import { Reducer } from '.';

interface FooState {
  thing: number,
  greeting: string,
}

export type FooAction = 
| {
  type: 'ChangeGreeting',
  greeting: string,
}
  
export const foo: Reducer<FooState> = (
  foo = { thing: 123, greeting: 'hello' },
  action,
) => {
  switch (action.type) {
    case 'ChangeGreeting':
      return {
        ... foo,
        greeting: action.greeting,
      }
    default:
      return foo;
  }
}