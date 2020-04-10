import {Dispatch, Reducer as _Reducer, createStore, combineReducers} from 'redux';
import {useDispatch as _useDispatch, useSelector as _useSelector, Provider as _Provider} from 'react-redux';
import {createElement} from 'react';

import {AppAction} from './actions';
import {allReducers} from './reducers';

export type UseDispatch = Dispatch<AppAction>;

export const useDispatch = () => _useDispatch<Dispatch<AppAction>>();

type StateFromReducers<T> = {
  [K in keyof T]: T[K] extends (...args: any) => infer R ? R : never
}

export type AppState = StateFromReducers<typeof allReducers>;

export const useSelector = <TSelected>(
  selector: (state: AppState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
 ) => _useSelector(selector, equalityFn);

export type Reducer<S> = _Reducer<S, AppAction>;

type OneAction<A, K> = A extends { type: K } ? A: never;

export type Reducers<S> = Partial<{
  [K in AppAction['type']]: (state: S, action: OneAction<AppAction, K>) => S;
}>

export function reduce<S>(reducers: Reducers<S>, state: S, action: AppAction) {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action as any) : state;
}

const store = createStore(
  combineReducers(allReducers)
);

export const Provider = ({children}: React.PropsWithChildren<{}> ) =>
  createElement(_Provider, {store}, children);

export {allReducers, AppAction}
export {shallowEqual} from 'react-redux';