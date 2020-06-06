import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import LockIcon from '@material-ui/icons/Lock';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import CreateIcon from '@material-ui/icons/Create';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
    borderRadius: '5px 7px',
    padding: '10px',
    boxShadow: '1px 1px',
  },
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function SubMenu(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <LibraryBooksIcon fontSize="large"/>
      <List component="nav" aria-label="documents">
      <Divider />
        <ListItem button onClick={() => {props.changeCallback('owner')}}>
          <ListItemIcon>
            <LockIcon /> 
          </ListItemIcon>
          <ListItemText primary="My Documents" />
        </ListItem>
        <ListItem button onClick={() => {props.changeCallback('signer')}}>
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Sign Documents" />
        </ListItem>
        <ListItem button onClick={() => {props.changeCallback('viewer')}}>
          <ListItemIcon>
            <FolderSharedIcon />
          </ListItemIcon>
          <ListItemText primary="Shared Documents" />
        </ListItem>
      </List>
    </div>
  );
}
