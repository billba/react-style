import { useDispatch, useSelector, shallowEqual } from "../redux";
import React from "react";
import {PureThing} from './PureThing';

export const Thing = () => {
    const dispatch = useDispatch();
    const stuff = useSelector(state => ({
        doodad: state.bar.doodad,
        a: state.foo.widget
    }), shallowEqual);

    dispatch({
        type: 'DoAnotherThing',
        barThing: {
            aString: 'dog',
        }
    });

    return <div>
        { stuff.doodad }
        <PureThing text={stuff.a}/>
    </div>;
}

