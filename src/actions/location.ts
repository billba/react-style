export interface Location {
  name: string;
}

declare module "actions" {

  export interface _AppAction {
    'ToggleLocation': {
    },
    'ChangeLocation': {
      location: Location,
    },
  }

}
