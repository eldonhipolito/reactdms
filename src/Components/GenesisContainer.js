import React from 'react'

import Container from '@material-ui/core/Container';
import Header from './Header.js';
import Footer from './Footer.js';
import { Router } from 'react-router-dom';

import {history} from './services/history.js';
import Routes from './Routes.js';


class GenesisContainer extends React.Component {

    
    render(){
        return (
            <div>
               <Header />
            <Container maxWidth="sm">
            <Router history={history}>
                    <Routes />
                </Router>
            </Container>
            <Footer />
            </div>
            );
    }

}

export default GenesisContainer;