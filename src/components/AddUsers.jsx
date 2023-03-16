import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';
import { URL } from '../App'
import './AddUsers.css'



function AddUsers() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [users, setUsers] = useState([]);
  const [projUsers, setProjUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [flag, setFlag] = useState(false);

  useEffect(() => {
    axios
      .get(`${URL}/api/projects/${id}`)
      .then((res) => setProject(res.data))
      .catch((err) => console.log(err));
  }, [id, flag]);

  useEffect(() => {
    Promise.all([
      axios.get(`${URL}/api/users`),
      axios.get(`${URL}/api/projects/${id}`)
    ]).then(([usersRes, projectRes]) => {
      const filteredUsers1 = usersRes.data.filter(
        (user) => !projectRes.data.users.includes(user._id)
      );
      setUsers(filteredUsers1);
      const filteredUsers2 = usersRes.data.filter((user) =>
        projectRes.data.users.includes(user._id)
      );
      setProjUsers(filteredUsers2);
    }).catch((err) => console.log(err));
  }, [id, flag]);
  

  const handleAddUser = () => {
    axios
      .put(`${URL}/api/projects/${id}`, {
        users: [...project.users, selectedUser],
      })
      .then(() => {
        setSelectedUser("");
        setFlag(!flag);
      })
      .catch((err) => console.log(err));
  };

  const handleRemoveUser = (userId) => {
    axios
      .put(`${URL}/api/projects/${id}`, {
        users: project.users.filter((id) => id !== userId),
      })
      .then(() => {
        setFlag(!flag);
      })
      .catch((err) => console.log(err));
  };

  if (!project) {
    return <Typography>Loading project...</Typography>;
  }
  return (
    <Card className="rootProfile">
      <CardContent>
        <Typography variant="h5" className="title">
          {project.name}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {project.description}
        </Typography>
        <Typography variant="h6" className="title">
          Users
        </Typography>
        {projUsers.map((user) => (
          <div
            key={user._id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom : 3
            }}
          >
            <Typography variant="body1" color="textSecondary">
              {user.firstName} {user.lastName}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              size="small"
              rounded
              onClick={() => handleRemoveUser(user._id)}
              className="buttonOne"
              shape="circle"
            >
              Remove
            </Button>
          </div>
        ))}

        <FormControl className="select" style={{marginTop : 15}}>
          <InputLabel id="user-label">Add user</InputLabel>
          <Select
            labelId="user-label"
            id="user"
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.firstName} {user.lastName} - {user.role}
              </MenuItem>
            ))}
          </Select>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
            className="button"
          >
            Add User
          </Button>
        </FormControl>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          component={Link}
          to={`/projects/${id}`}
        >
          Back
        </Button>
      </CardActions>
    </Card>
  );
}
export default AddUsers;
