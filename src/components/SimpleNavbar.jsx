import React from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from '@mui/icons-material/Dashboard';

function SimpleNavbar(props) {
  const { logged, logOut } = props;
  return (
    <AppBar position="fixed">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Bug Tracker
        </Typography>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          Logged in as: {logged.role}
        </Typography>
        <IconButton component={Link} to="/dashboard" color="inherit">
          <DashboardIcon />
        </IconButton>
        <IconButton component={Link} to="/" color="inherit" onClick={() => logOut}>
          <LogoutIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default SimpleNavbar;
