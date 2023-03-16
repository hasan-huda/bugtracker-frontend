import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, TextField, MenuItem, Button } from '@mui/material';
import axios from "axios";
import { URL } from "../App";
import './AddDev.css';

const AddDev = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [users, setUsers] = useState([]);
  const [developer, setDeveloper] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${URL}/api/tickets/${id}`)
      .then((response) => setTicket(response.data))
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${URL}/api/users`)
      .then((response) => {
        const filteredUsers = response.data.filter(
          (user) => user.role !== "Submitter"
        );
        setUsers(filteredUsers);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleAssign = () => {
    axios
      .put(`${URL}/api/tickets/${id}`, { developer })
      .then(() => navigate(`/tickets/${id}`))
      .catch((error) => console.error(error));
  };

  return (
    <div>
      <Typography variant="h4" align="center">
        Assign Developer
      </Typography>
      {ticket && (
        <form className="form">
          <Typography variant="h6">{ticket.title}</Typography>
          <TextField
            className="input"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            value={ticket.description}
            InputProps={{ readOnly: true }}
          />
          <TextField
            className="input"
            label="Assign Developer"
            select
            value={developer}
            onChange={(event) => setDeveloper(event.target.value)}
            variant="outlined"
            style={{ width: '300px' }}
          >
            {users.map((user) => (
              <MenuItem key={user._id} value={user._id}>
                {user.firstName} ({user.role})
              </MenuItem>
            ))}
          </TextField>
          <Button
            className="button"
            variant="contained"
            color="primary"
            onClick={handleAssign}
          >
            Assign
          </Button>
        </form>
      )}
    </div>
  );
};

export default AddDev;
