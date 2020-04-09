# React Coding Guidelines

## Redux

### File Structure

Each reducer goes in its own file under the `redux` directory:

```
src
  redux
    foo.ts
    bar.ts
    ...
    index.ts
```

[foo.ts](./redux/foo.ts) is a typical reducer file. It imports `Reducer` from `.` and uses it to construct the reducer, which it exports.

[index.ts](./redux/index.ts) is the opinionated source of all things Redux for this project. It creates a store and exports:
* `AppAction` and `AppState`
* opinionated versions of `Reducer`, `useDispatch`, `useSelector`, and `Provider` using the above types
* `shallowEqual` for convenience

### Illustration of using Redux with hooks

[index.tsx](./index.tsx) is a sample top-level file. It imports our opinionated `Provider` and a component called `Thing`.

[PureThing](./components/Thing.tsx) exports a pure presentational component.

[Thing](./components/Thing.tsx) imports our opinionated `useDispatch` and `useSelector` and also `shallowEqual`, and exports a reactive component. 