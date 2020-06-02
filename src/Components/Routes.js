import React from 'react'
import { Switch, Route } from 'react-router-dom';

import SignUp from './SignUp.js';
import SignIn from './SignIn.js';

export default class Routes extends React.Component {

    render () {
        return (<Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/register" exact component={SignUp} />
            <Route component={SignIn} />
        </Switch>);
    }
}


