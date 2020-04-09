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

[bar.ts](./reducers/bar.ts) is a typical reducer file. It imports `Reducer` from `../redux` and uses it to construct the reducer, which it exports default.

[location.ts](./actions/location.ts) is a typical actions file. It exports `LocationAction` as well as the helper type `Location` which is used in `bar.ts` above. If `Location` were used elsewhere in the app it might make more sense to put it somewhere else. An actions file should be just for types used in actions and reducers.

[redux.ts](./redux.ts) is the opinionated source of all things Redux for this project. It creates a store and exports:
* `AppAction` and `AppState`
* opinionated versions of `Reducer`, `useDispatch`, `useSelector`, and `Provider` using the above types
* `shallowEqual` for convenience

### Illustration of using Redux with hooks

[index.tsx](./index.tsx) is a sample top-level file. It imports our opinionated `Provider` and a component called `Thing`.

[PureThing](./components/Thing.tsx) exports a pure presentational component.

[Thing](./components/Thing.tsx) imports our opinionated `useDispatch` and `useSelector` and also `shallowEqual`, and exports a reactive component.

### Using classic Redux

`import {AppState, AppAction} from '../redux'` to access the appropriate typing when using `connect`.
