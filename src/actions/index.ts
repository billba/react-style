import {GreetingAction} from "./greeting";
import {LocationAction} from './location';

export type AppAction =
| GreetingAction
| LocationAction
// add new actions here