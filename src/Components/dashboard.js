import React, {useState,useEffect} from 'react';

import {useCookies} from 'react-cookie';
import {URI} from './config/server.js';
import SubMenu from './SubMenu.js';
import DocumentDisplay from './DocumentDisplay.js';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      marginTop: '50px',
    },
    paper: {
      height: 140,
      width: 100,
    },
    control: {
      padding: theme.spacing(2),
    },
  }));

export default function Dashboard() {
    const classes = useStyles();
    const [cookies] = useCookies();
    const [data, setData] = useState({
        loading : true,
        documents : null,
        documentSet : 'owner',
    });

    const handleChangeMenu = (newVal) => {
        console.log(newVal);
        setData({...data, documentSet : newVal});
    };

    useEffect(() => {
        axios.get(URI + `/documents/${cookies.UserCookie}?relation=${data.documentSet}`, {headers: {Authorization : cookies.Authorization}})
        .then((res) => {
            setData({...data, loading : false, documents : res.data.documents});
        });
    }, [data.documentSet]);


    const display = !data.loading && <DocumentDisplay data={data.documents}/> ;

 
    return (
    <Grid container className={classes.root} xs={12}>
        
 
        <Grid  item xs={3}>
        <SubMenu changeCallback={handleChangeMenu}/>
        </Grid >
        <Grid  item xs={9}>
        {display}
        </Grid>
    </Grid>);
        
    


   


};