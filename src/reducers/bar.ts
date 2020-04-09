import {Reducer} from '../redux';
import {Location} from '../actions/location';

interface BarState {
  location: Location;
}

const bar: Reducer<BarState> = (
  bar = {
    location: {
      name: 'world',
    }
  },
  action,
) => {
  switch (action.type) {
    case 'ToggleLocation':
      return {
        ... bar,
        location: {
          name: bar.location.name === "world" ? "Cleveland" : "world",
        }
      }
    default:
      return bar;
  }
}

export default bar;