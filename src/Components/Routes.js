import React from 'react'
import { Switch, Route } from 'react-router-dom';

import SignUp from './SignUp.js';
import SignIn from './SignIn.js';
import Dashboard from './dashboard.js';
import {useCookies} from 'react-cookie';
import CreateDocument from './CreateDocument.js';
import DocumentDetails from './DocumentDetails.js';
export default function Routes() {

const [cookies, setCookies] = useCookies(["isAuth"]);

console.log(cookies.isAuth);
        return (
            cookies.isAuth ? (
            <Switch>
                <Route path="/dashboard" exact component={Dashboard} />
                <Route path="/documents/create" exact component={CreateDocument} />
                <Route path="/documents/:id/details" exact component={DocumentDetails} />
                <Route component={Dashboard} />
            </Switch>):
            (
        <Switch>
            <Route path="/" exact component={SignIn} />
            <Route path="/register" exact component={SignUp} />
            <Route component={SignIn} />
        </Switch>
            )
        );
    
}


