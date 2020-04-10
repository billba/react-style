# React Coding Guidelines

## Redux

### File Structure

```
src
  actions
    location.ts
    greeting.ts
    ...
    index.ts
  components
    ...
  reducers
    foo.ts
    bar.ts
    ...
    index.ts
  ...
  redux.ts
```

[foo.ts](./src/reducers/foo.ts) is a typical `switch`-based reducer file. It import `Reducer` from `../redux` and uses it to construct the reducer, which it exports default. An interface is created for the state type, but it isn't exported and typically would not need to be.

[bar.ts](./src/reducers/bar.ts) is another `switch`-based reducer file. It imports a helper type from the [location.ts](./src/actions/location.ts) actions file.

You are not limited to `switch`-based reducers. Helpers make it easy to provide a dictionary of single-action reducers to make your code more readable:

* [bar-switchless.ts](./src/reducers/bar-switchless.ts) use the `Reducers` and `reduce` helpers to avoid `switch`. Note that the type of `action` in each single-action reducer is correctly narrowed to the action type in question.

* [bar-switchless-alternate.ts](./src/reducers/bar-switchless-alternate.ts) does the same, using a functional syntax for the single-action reducer versus the lambda syntax shown in `bar-switchless.ts`.

* [bar-createReducer.ts](./src/reducers/bar-createReducer.ts) uses the `createReducer` higher-order function for a more functional approach to `bar-switchless.ts`.

* Finally, [bar-most-concise.ts](./src/reducers/bar-most-concise.ts) omits local types and helpers to produce the most concise possible version of the `bar` reducer.

All these versions of `bar.ts` are functionally equivalent.

[location.ts](./src/actions/location.ts) is a typical actions file. It exports `LocationAction` as well as the helper type `Location` which is used in `bar.ts` above. If `Location` were used elsewhere in the app it might make more sense to put it somewhere else. An actions file should be just for types used in actions and reducers.

[redux.ts](./src/redux.ts) is the opinionated source of all things Redux for this project. It creates a store and exports:
* `AppAction` and `AppState`
* `Reducers` and `reduce` which are helpers for no-switch reducers
* opinionated versions of `Reducer`, `useDispatch`, `useSelector`, and `Provider` using the above types
* `shallowEqual` for convenience

### Illustration of using Redux with hooks

[index.tsx](./src/index.tsx) is a sample top-level file. It imports our opinionated `Provider` and a component called `Thing`.

[PureThing](./src/components/Thing.tsx) exports a pure presentational component.

[Thing](./src/components/Thing.tsx) imports our opinionated `useDispatch` and `useSelector` and also `shallowEqual`, and exports a reactive component.

### Using classic Redux

`import {AppState, AppAction} from '../redux'` to access the appropriate typing when using `connect`.
