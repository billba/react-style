export interface Location {
  name: string;
}

declare module '@actions' {

  interface _AppAction {
    'ToggleLocation': {
    },
    'ChangeLocation': {
      location: Location,
    },
    // add new actions here
  }

}
