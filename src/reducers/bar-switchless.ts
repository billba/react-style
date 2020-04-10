import {Reducer, Reducers, reduce} from '../redux';
import {Location} from '../actions/location';

interface BarState {
  location: Location;
}

const reducers: Reducers<BarState> = {
  'ToggleLocation': (bar, action) => ({
    ... bar,
    location: {
      name: bar.location.name === "world" ? "Cleveland" : "world",
    }
  }),
}

const bar: Reducer<BarState> = (
  bar = {
    location: {
      name: 'world',
    }
  },
  action,
) => reduce(reducers, bar, action);

export default bar;