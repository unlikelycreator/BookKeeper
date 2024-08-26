// ListItems.jsx
import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CommentIcon from '@mui/icons-material/Comment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';
import { Divider } from '@mui/material';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton component={Link} to="/dashboard/home">
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/social">
      <ListItemIcon>
        <CommentIcon />
      </ListItemIcon>
      <ListItemText primary="Social" />
    </ListItemButton>
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment >
    <ListSubheader component="div" inset sx={{color: '#2a4c81', backgroundColor: "#fff"}}>
      More Filters
    </ListSubheader>
    <Divider />
    <ListItemButton sx={{mt: 1}} component={Link} to="/dashboard/current-month">
      <ListItemIcon>
        <AccessTimeIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/last-quarter">
      <ListItemIcon>
        <AccessTimeIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton component={Link} to="/dashboard/year-end-sale">
      <ListItemIcon>
        <AccessTimeIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
