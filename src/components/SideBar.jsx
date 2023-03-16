import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Avatar,
  Divider,
} from '@mui/material'
import { Link } from "react-router-dom";
import {
  SettingsAccessibility as SettingsAccessibilityIcon,
  Workspaces as WorkspacesIcon,
  Receipt as ReceiptIcon,
  Person as PersonIcon,
  Dashboard as DashboardIcon
} from "@mui/icons-material";
import './SideBar.css'
import { URL } from "../App";



function SideBar(props) {
  const { logged } = props;

  return (
    <div className="root1">
      <Drawer
        className="drawer"
        variant="permanent"
        classes={{
          paper: "drawerPaper",
        }}
        anchor="left"
      >
        <List>
          <ListItem>
            <Avatar className="userAvatar">
              {logged.firstName.charAt(0).toUpperCase()}
            </Avatar>
            <ListItemText
              primary={`Welcome ${logged.firstName}!`}
              primaryTypographyProps={{
                variant: "p",
                fontWeight: "bold",
              }}
            />
          </ListItem>

          <Divider />

          <ListItemButton component={Link} to="/dashboard">
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard Home" style={{ color: "grey" }} />
          </ListItemButton>

          {logged.role === "Admin" && (
            <ListItemButton component={Link} to="/manageRoles">
              <ListItemIcon>
                <SettingsAccessibilityIcon />
              </ListItemIcon>
              <ListItemText primary="Manage Users" style={{ color: "grey" }} />
            </ListItemButton>
          )}

          {logged.role !== "Submitter" && (
            <ListItemButton component={Link} to="/projects">
              <ListItemIcon>
                <WorkspacesIcon />
              </ListItemIcon>
              <ListItemText primary="My Projects" style={{ color: "grey" }} />
            </ListItemButton>
          )}

          <ListItemButton component={Link} to="/tickets">
            <ListItemIcon>
              <ReceiptIcon />
            </ListItemIcon>
            <ListItemText primary="My Tickets" style={{ color: "grey" }} />
          </ListItemButton>

          <ListItemButton component={Link} to="/userProfile">
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="User Profile" style={{ color: "grey" }} />
          </ListItemButton>
        </List>
      </Drawer>
    </div>
  );
}

export default SideBar;
