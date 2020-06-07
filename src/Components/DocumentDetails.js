import React, {useState, useEffect} from 'react';

import axios from 'axios';
import {useCookies} from 'react-cookie';
import {URI} from './config/server.js';

import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Divider } from '@material-ui/core';


import IconButton from '@material-ui/core/IconButton';


import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';



const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      '& > *': {
        margin: theme.spacing(1),
        width: theme.spacing(16),
        height: theme.spacing(16),
      },
    },
    paper : {
        width: '45vw',
        height: '50vh',
    },
    hidden : {
        display: 'none'
    }
  }));


export default function DocumentDetails(props){

    const classes = useStyles();

    const [data, setData] = useState({
        loading : true,
        document : null,
    });

    const [cookies] = useCookies(["Authorization"]);

    
    useEffect(() => {
        axios.get(URI + props.match.url, {headers: {Authorization : cookies.Authorization}})
        .then((res) => {
            console.log(res);
            setData({...data, loading : false, document : res.data});
        });
    }, []);

    const handleChange = (event) => {

    };

    const title = !data.loading && data.document.title;
    const description = !data.loading && data.document.description;
    const hash = !data.loading && data.document.hash;
    const owner = !data.loading && data.document.owner;

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
            <h1>Document</h1>
            <Divider />
            <h2>{title}</h2>
            <h3>{description}</h3>
            <h3>{hash}</h3>
            <h3>{owner}</h3>
            <Divider />

            <input className={classes.hidden} id="fileName" type="file" name="fileName"/>
          <label htmlFor="fileName">
              <TextField disabled value={data.fileName || ""} label="Upload document"/>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <CloudUploadIcon />
        </IconButton>
      </label>
            </Paper>

        </div>

    );

}