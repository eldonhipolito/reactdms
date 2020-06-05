import React from 'react'

import Container from '@material-ui/core/Container';
import Header from './Header.js';
import Footer from './Footer.js';
import { Router } from 'react-router-dom';

import {history} from './services/history.js';
import Routes from './Routes.js';
import {CookiesProvider} from 'react-cookie';


class GenesisContainer extends React.Component {

    //   <Container maxWidth="sm">
                    
    //</Container>
    render(){
        return (
            <div>
                  <CookiesProvider>
               <Header />
         
              
            <Router history={history}>
                    <Routes />
                </Router>

            <Footer />
            </CookiesProvider>
            </div>
            );
    }

}

export default GenesisContainer;