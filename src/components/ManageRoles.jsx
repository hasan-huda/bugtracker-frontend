import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Select,
  MenuItem,
  Typography,
  Button,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  FormControl,
  InputLabel,
  Divider,
} from '@mui/material';
import './AdminDashboard.css'
import { URL } from "../App";

function ManageRoles(props) {
  const { logged } = props;
  const [errors, setErrors] = useState(null);
  const [flag, setFlag] = useState(true);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const roles = [
    { id: 1, name: "Admin" },
    { id: 2, name: "Project Manager" },
    { id: 3, name: "Developer" },
    { id: 4, name: "Submitter" },
  ];

  const handleUserClick = (user) => {
    setSelectedUser(user);
    setErrors([]);
  };

  const handleRoleChange = (event, user) => {
    const formRole = {
      role: event.target.value,
    };
    axios
      .put(`${URL}/api/users/${user._id}`, formRole)
      .then((res) => {
        console.log(res.data);
        setFlag(!flag);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDelete = (user) => {
    if (window.confirm(`Are you sure you want to delete ${user.firstName}?`)) {
      axios
        .delete(`${URL}/api/users/${user._id}`)
        .then(() => {
          setSelectedUser(null);
          setUsers(users.filter((u) => u.id !== user.id));
          setFlag(!flag);
        })
        .catch((error) => {
          setErrors(["Error deleting user"]);
        });
    }
  };

  useEffect(() => {
    axios
      .get(`${URL}/api/users/`)
      .then((response) => {
        const filteredUsers = response.data.filter(
          (user) => user._id !== logged._id
        );
        setUsers(filteredUsers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [flag]);

  return (
    <div className="root2">
      <Typography variant="h4" className="header" style={{ fontWeight: "bold", marginTop: 40 }}>
            Manage Roles
          </Typography>
      <List style={{ maxHeight: 400, overflow: "auto" }}>
        {users.map((user) => (
          <div key={user.id}>
            <ListItem
              button
              selected={selectedUser && selectedUser.id === user.id}
              onClick={() => handleUserClick(user)}
            >
              <ListItemAvatar>
                <Avatar>{user.firstName.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText primary={user.firstName} secondary={user.email} />
              <FormControl style={{ minWidth: 120 }}>
                <InputLabel>Role</InputLabel>
                <Select
                  value={user.role}
                  onChange={(event) => handleRoleChange(event, user)}
                >
                  {roles.map((role) => (
                    <MenuItem key={role.id} value={role.name}>
                      {role.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleDelete(user)}
                style={{ marginLeft: "20px" }} // Add inline CSS here
              >
                Delete User
              </Button>
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
      <Typography color="error" variant="body2">
        {errors &&
          errors.map((error) => (
            <div key={error}>
              <p>{error}</p>
            </div>
          ))}
      </Typography>
    </div>
  );
}

export default ManageRoles;
