# React Style Guide

This project illustrates an opinionated approach to writing a Redux/GraphQL React app.

## Build & Run

* Install `yarn` if you haven't already
* `yarn`
* `yarn start`

Then point your browser at http://localhost:8000

## Redux

### Sample App File Structure

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

* [bar-createReducer.ts](./src/reducers/bar-createReducer.ts) uses the `createReducer` higher-order function for a more functional approach to `bar-switchless.ts`.

* Finally, [bar-most-concise.ts](./src/reducers/bar-most-concise.ts) omits local types and helpers to produce the most concise possible version of the `bar` reducer.

All these versions of `bar.ts` are functionally equivalent.

[location.ts](./src/actions/location.ts) is a typical actions file. It exports `LocationAction` as well as the helper type `Location` which is used in `bar.ts` above. If `Location` were used elsewhere in the app it might make more sense to put it somewhere else. An actions file should be just for types used in actions and reducers.

[redux.ts](./src/redux.ts) is the opinionated source of all things Redux for this project. It creates a store and exports:
* `AppAction` and `AppState`
* `Reducers` and `reduce` which are helpers for no-switch reducers
* opinionated versions of `Reducer`, `useDispatch`, `useSelector`, and `Provider` using the above types
* `shallowEqual` for convenience

[index.tsx](./src/index.tsx) is a sample top-level file. It imports our opinionated `Provider` and a component called `Thing`.

[PureThing](./src/components/Thing.tsx) exports a pure presentational component.

[Thing](./src/components/Thing.tsx) imports our opinionated `useDispatch` and `useSelector` and also `shallowEqual`, and exports a reactive component.

### Actions

Actions go under `actions`, grouped in multiple files. Each file exports an action type which is a union of all the actions in that group. Although many actions are associated with a single reducer, some will be handled by multiple reducers, and so grouping them by reducer ultimately leads to confusion about how Redux works, as well as difficult typing and import patterns.

#### `AppAction`: the Single Action Type

When you add a new action group you need to import that type into `actions/index.ts` where it will be unioned into `AppAction`, which is ultimately exported by `redux.ts`

#### Grouping Actions

How to group actions depends on your application. A smallish application might just group all the actions into one file, but that can become unwieldy.

Suppose you were building a mail client with a typical list of messages on the left and a reading pane on the right. You'd probably have a reducer for the message list and another for the reading pane. A simple approach to grouping actions would be to mirror this structure. But consider a `selectMessage` action, which would likely be handled by both reducers -- which group do you put it in now? Instead, consider a grouping that is more about, well, actions. There might be a group for `selection`, one for `editing`, and one for `syncing`. There is no right answer, and the truth is you'll often end up searching for actions.

#### Associated types

Sometimes a type used in an action is also used in a reducer. `export` it from the action file and `import` it into the reducer file, as we do in this sample with the `Location` type. If this type is used outside of Redux code then define it elsewhere the application and `import` it into both the action file and the reducer file.

#### Action creators

In general dispatching actions directly is clearer than using action creators because the parameters are named, e.g. `dispatch({ type: 'changeLocation', location: 'Seattle', longitude: 55.132, latitude: 45.912 })` versus `dispatch(changeLocation('Seattle', 55.132, 45.912))` (in the latter, which is the longitude and which is the latitude?). But once in a while creating an action requires code of some kind, e.g. calculating values, in which case use an action creator to avoid duplicating said code.

#### Action format

In general, use flat action formats, e.g. `dispatch({ type: 'changeLocation', location: 'Seattle', longitude: 55.132, latitude: 45.912 })` versus `dispatch({ type: 'changeLocation', payload: { location: 'Seattle', longitude: 55.132, latitude: 45.912 }})`. It's more concise on both the dispatching and reducing side of things.

#### Action Types

Some folks like creating constants for Action types using either `const` or `enum`. I say this is just unnecessary overhead. The strong typing we use means that TypeScript will autocomplete for you when you type `dispatch({ type: '` and it will flag errors if you use nonexistant types.

#### Naming Conventions for Action Types

One obvious approach is to lean on the grouping you establish. If your grouping is `sync` then an action name might be `sync_sendMessage`.

#### Action Type Case

WHY_OH_WHY_DO_PEOPLE_LIKE_THIS? Since we're not using constants anyway let's just name things `asTheJavaScriptGodsIntended`.

### Reducers

Reducers go under `reducers`, one reducer per file exported `default`.

#### Every Top-Level Reducer Accepts Every Action

It is the nature of Redux that every top-level reducer will handle every action, even if only to return the state unchanged. And although many actions are associated with a single reducer, some will be explicitly handled by multiple reducers. So every reducer should typed such that it accepts every action.

`redux.ts` exports `AppAction` which is a union of all actions. Use this as the type of the `action` paremeter for your reducer, or save a little code by using the `Reducer` or `createReducer` helper.

#### Splitting Reducers up

If your reducer's state gets complex it can be helpful to split the logic up as shown in the [Redux tutorial](https://redux.js.org/basics/reducers/#splitting-reducers). These non-top-level reducers can share a file with their parent reducer, or be `import`ed from their own files. They can also be correctly typed using the `Reducer` or `createReducer` helpers.

#### Using `switch`

You don't need to -- the `createReducer` helper makes it easy to instead use a dictionary of single-action reducer functions.

### Using classic Redux

`import {AppState, AppAction} from '../redux'` to access the appropriate typing when using `connect`.
