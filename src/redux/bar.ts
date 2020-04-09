import { Reducer } from '.';

interface Location {
  name: string;
}

interface BarState {
  location: Location;
}

export type BarAction =
| {
  type: 'ToggleLocation',
}

export const bar: Reducer<BarState> = (
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