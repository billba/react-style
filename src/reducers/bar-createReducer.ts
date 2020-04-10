import {Reducers, createReducer} from '../redux';
import {Location} from '../actions/location';

interface BarState {
  location: Location;
}

const reducers: Reducers<BarState> = {
  ToggleLocation: (bar, action) => ({
    ... bar,
    location: {
      name: bar.location.name === "world" ? "Cleveland" : "world",
    }
  }),
}

export default createReducer<BarState>(
  () => ({
    location: {
      name: 'world',
    }
  }),
  reducers
);