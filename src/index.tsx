import { Provider } from './redux';
import { Thing } from './components/Thing';
import React from 'react';
import { render } from 'react-dom';

const App = () => <Provider>
    <Thing/>
</Provider>;

render(<App/>, document.getElementById("app"));
