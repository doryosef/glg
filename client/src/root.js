import React from 'react';
import {render} from 'react-dom';
import { Router, Route, browserHistory } from 'react-router';

import Layout from "./components/Layout";

function buildRoutes() {
    return (
        <Router history={browserHistory}>
            <Route path="/" component={Layout} >
            </Route>
        </Router>
    )
}

render(buildRoutes(), document.getElementById('glg'));