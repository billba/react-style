import { foo, FooAction } from './foo';
import { bar, BarAction } from './bar';
import { Dispatch, Reducer as _Reducer, createStore, combineReducers } from 'redux';
import { useDispatch as _useDispatch, useSelector as _useSelector, Provider as _Provider } from 'react-redux';
import { createElement } from 'react';
export { shallowEqual } from 'react-redux';

export type AppAction =
| FooAction
| BarAction
// add new actions here

export type UseDispatch = Dispatch<AppAction>;

export const useDispatch = () => _useDispatch<Dispatch<AppAction>>();

const allReducers = {
    foo,
    bar,
    // add new reducers here
}

type StateFromReducers<T> = {
  [K in keyof T]: T[K] extends (...args: any) => infer R ? R : never
}

export type AppState = StateFromReducers<typeof allReducers>;

export const useSelector = <TSelected>(
  selector: (state: AppState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
 ) => _useSelector(selector, equalityFn);

export type Reducer<S> = _Reducer<S, AppAction>;

const store = createStore(
  combineReducers(allReducers)
);

export const Provider = ({children}: React.PropsWithChildren<{}> ) =>
  createElement(_Provider, {store}, children);