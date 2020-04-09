import { useDispatch, useSelector, shallowEqual } from "../redux";
import React, { useCallback } from "react";
import {PureThing} from './PureThing';

export const Thing = () => {
  const dispatch = useDispatch();
  const {greeting, locationName} = useSelector(state => ({
    greeting: state.foo.greeting,
    locationName: state.bar.location.name,
  }), shallowEqual);

  const onClick = useCallback(() => dispatch({
    type: 'ToggleLocation',
  }), []);

  return <PureThing
    text={`${greeting} ${locationName}`}
    onClick={onClick}
  />;
}

