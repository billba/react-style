export interface Location {
  name: string;
}

export type LocationAction =
  {
  'ToggleLocation': {
    dog: number,
  },
  'ChangeLocation': {
    location: Location,
  },
}
