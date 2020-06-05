import React, {useState} from 'react'

import {useCookies} from 'react-cookie';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import DescriptionIcon from '@material-ui/icons/Description';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';

import CloudUploadIcon from '@material-ui/icons/CloudUpload';

import axios from 'axios';
import {URI} from './config/server.js';


const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
    hidden: {
     display : 'none'   
    }
  }));

export default function CreateDocument() {

    const classes = useStyles();

    const [data, setData] = useState({
        fileName : null,
        title : null,
        description : null,
        password: null
    });

    const handleData = (prop) => (event) => {
        setData({...data, [prop] : event.target.value});
    };

    const [cookies] = useCookies();

    const jsonParams = { creator: cookies.UserCookie,
        title : data.title,
        description : data.description,
        password : data.password};

        
    const submitAction = (event) => {
        event.preventDefault();
        console.log( document.getElementById("fileName").files[0]);
        const json = JSON.stringify(jsonParams);
        console.log(json);
        const blob = new Blob([json], {type: 'application/json'});
        const formFile = new FormData();
        formFile.append("file", document.getElementById("fileName").files[0]);
        formFile.append("document", json);
        axios.post(URI + "/documents/create", formFile, 
        {headers : {Authorization : cookies.Authorization, "Content-type": 'multipart/form-data'}})
    .then(res => console.log(res));

}

   return <div>
    <CssBaseline />
    <div className={classes.paper}>
      <Avatar className={classes.avatar}>
        <DescriptionIcon />
      </Avatar>
      <Typography component="h1" variant="h5">
        Create document
      </Typography>
      <form className={classes.form} onSubmit={submitAction}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="title"
              label="Title"
              name="title"
              autoComplete="title"
              value={data.title || ""}
              onChange={handleData("title")}
            />
          </Grid>
         
          <Grid item xs={12}>
            <TextField
                multiline
              required
              fullWidth
              id="description"
              label="Description"
              name="description"
              value={data.description || ""}
              onChange={handleData("description")}
              autoComplete="description"
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              value={data.password || ""}
              onChange={handleData("password")}
            />
          </Grid>
          <Grid item xs={12}>
          <input className={classes.hidden} id="fileName" type="file" name="fileName" onChange={handleData("fileName")}/>
          <label htmlFor="fileName">
              <TextField disabled value={data.fileName || ""} label="Upload document"/>
        <IconButton color="primary" aria-label="upload picture" component="span">
          <CloudUploadIcon />
        </IconButton>
      </label>
         </Grid>
        </Grid>
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}>
            Submit
          </Button>

      </form>
    </div>
    </div>

}