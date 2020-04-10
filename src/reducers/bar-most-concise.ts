import {createReducer} from '../redux';
import {Location} from '../actions/location';

export default createReducer<{
  location: Location;
}>(() => ({
    location: {
      name: 'world',
    }
  }), {
    'ToggleLocation': (bar, action) => ({
      ... bar,
      location: {
        name: bar.location.name === "world" ? "Cleveland" : "world",
      }
    }),
  }
);