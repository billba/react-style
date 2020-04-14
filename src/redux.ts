import {Dispatch, Reducer as _Reducer, createStore, combineReducers, Store} from 'redux';
import {useDispatch as _useDispatch, useSelector as _useSelector, Provider as _Provider} from 'react-redux';
import {createElement} from 'react';

import {_AppAction} from '@actions';
import {allReducers} from './reducers';

const store = createStore(
  combineReducers(allReducers)
);

export type AppState = typeof store extends Store<infer S> ? S : never;

type Typify<A> = A extends Record<infer T, any> ? T extends string ? { type: T } & A[T] : never : never;

export type AppAction = Typify<_AppAction>;

export const useDispatch = () => _useDispatch<Dispatch<AppAction>>();

export const useSelector = <TSelected>(
  selector: (state: AppState) => TSelected,
  equalityFn?: (left: TSelected, right: TSelected) => boolean,
 ) => _useSelector(selector, equalityFn);

export type Reducer<S> = _Reducer<S, AppAction>;

export type Reducers<S> = Partial<{
  [K in keyof _AppAction]: (state: S, action: _AppAction[K] & { type: K }) => S;
}>

export const reduce = <S>(reducers: Reducers<S>, state: S, action: AppAction) => {
  const reducer = reducers[action.type];
  return reducer ? reducer(state, action as any) : state;
}

export const createReducer = <S>(initState: () => S, reducers: Reducers<S>) =>
  (state = initState(), action: AppAction) => reduce(reducers, state, action);

export const Provider = ({children}: React.PropsWithChildren<{}> ) =>
  createElement(_Provider, {store}, children);

export {allReducers}
export {shallowEqual} from 'react-redux';

// The below enables an alternate take on dispatch of the form:
//    dispatch('typeWithNoPayload'); // 
//    dispatch('typeWithPayload', {various: 'kinds', of: 'payload'});

type NoPayload<T> = {
  [K in keyof T]: keyof T[K] extends never ? K : never
}[keyof T];

type Payload<T> = Exclude<keyof T, NoPayload<T>>;

interface AlternateDispatch<T> {
  (type: NoPayload<T>): void;
  (type: Payload<T>, payload: T[typeof type]): void;
}

export const useAlternateDispatch = () => {
  const dispatch = _useDispatch();
  return ((type: any, payload?: any) => dispatch({ type, ... payload})) as AlternateDispatch<_AppAction>;
}
