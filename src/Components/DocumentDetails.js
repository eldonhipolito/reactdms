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
import FindInPageIcon from '@material-ui/icons/FindInPage';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Grid from '@material-ui/core/Grid';


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

  function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }


export default function DocumentDetails(props){

    const classes = useStyles();

    const [data, setData] = useState({
        loading : true,
        document : null,
        verificationDone: false,
        verificationResult: "",
        fileToValidate : null,
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
        if(!event.target.value) return;
     
        const formFile = new FormData();
        formFile.append("file", event.target.files[0]);
        document.getElementById(event.target.id).value = null;
        axios.post(URI + "/documents/" + data.document.id + "/verify", formFile, 
        {headers : {Authorization : cookies.Authorization, "Content-type": 'multipart/form-data'}})
    .then(res => 
        {
            let status;
            if(res.data.success) {
                status = "success";
            } else {
                status = "warning";
            }
            setData({...data, verificationDone : true, verificationResult : status});

            
        }
        );
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setData({...data, verificationDone : false});
      };

    const title = !data.loading && data.document.title;
    const description = !data.loading && data.document.description;
    const hash = !data.loading && data.document.hash;
    const owner = !data.loading && data.document.owner;

    const alertText = data.verificationResult === "success" ? "Document matches!" : "Document doesn't match";
    const alertType = (data.verificationResult === "success" ? "success" : "warning" );

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
            <Grid container>
                <Grid item xs={12}>
                    
            <FindInPageIcon fontSize="large" />
            </Grid>
            <Grid item xs={12}>
                <input className={classes.hidden} id="fileName" type="file" name="fileName" onChange={handleChange}/>
                <label htmlFor="fileName">
                    <TextField disabled value={data.fileName || ""} label="Verify document"/>
                <IconButton color="primary" aria-label="upload picture" component="span">
                <CloudUploadIcon  fontSize="large"/>
           
                </IconButton>
                 </label>
            </Grid>
      </Grid>
            </Paper>
            <Snackbar open={data.verificationDone} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={alertType}>
                {alertText}
                </Alert>
            </Snackbar>
            
        </div>

    );

}