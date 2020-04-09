export interface Location {
  name: string;
}

export type LocationAction =
| {
  type: 'ToggleLocation',
}
| {
  type: 'ChangeLocation',
  location: Location,
}
