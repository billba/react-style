import { Reducer } from '.';

interface BarThing {
  aString: string;
}

interface BarState {
  doodad: number,
  barThing: BarThing;
}

export type BarAction =
| {
  type: 'DoAnotherThing',
  barThing: BarThing,
}

export const bar: Reducer<BarState> = (
  bar = {
    doodad: 1,
    barThing: {
      aString: 'hey'
    }
  },
  action,
) => {
  switch (action.type) {
    case 'DoAnotherThing':
      return {
        ... bar,
        barThing: action.barThing,
      }
    default:
      return bar;
  }
}