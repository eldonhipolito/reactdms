import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function CAppBar(props) {
  const isAuth = props.isAuth;
  const classes = useStyles();

  const elem = isAuth ?
  <div>
    <Button color="inherit" href="/documents/create">Create Document</Button>
  <Button color="inherit" href="/logout"> Sign Out </Button>
  </div> :
  (<div> <Button color="inherit" href="/">Login</Button>

  <Button color="inherit" href="/register">Sign Up</Button>
  </div>);

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <HomeIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Contract Management
          </Typography>
          {elem}
        </Toolbar>
      </AppBar>
    </div>
  );
}
