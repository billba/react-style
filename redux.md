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

[foo.ts](./src/reducers/foo.ts) and [bar.ts](./src/reducers/bar.ts) are typical reducer files. They each import `Reducer` from `../redux` and uses it to construct the reducer, which it exports default. `tar.ts` uses a `switch` approach, `bar.ts` uses a dictionary of single-action reducers.

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
