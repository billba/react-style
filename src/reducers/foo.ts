import {Reducer} from '../redux';

interface FooState {
  thing: number,
  greeting: string,
}

const foo: Reducer<FooState> = (
  foo = {thing: 123, greeting: 'hello'},
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

export default foo;