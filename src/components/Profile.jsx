import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Avatar,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
  TextField,
} from '@mui/material';
import './Profile.css'
import { URL } from "../App";


function Profile(props) {
  const { logged, logIn } = props;
  const [firstName, setFirstName] = useState(logged.firstName);
  const [lastName, setLastName] = useState(logged.lastName);
  const [email, setEmail] = useState(logged.email);
  const [errors, setErrors] = useState(null);
  const [flag, setFlag] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${URL}/api/users/${logged._id}`)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, [flag]);

  const handleConfirm = (e) => {
    e.preventDefault();
    const formUser = {
      lastName: lastName,
      email: email,
    };
    axios
      .put(`${URL}/api/users/${logged._id}`, formUser)
      .then((res) => {
        logIn(res.data);
        setFlag(!flag);
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  const handleClick = () => {
    navigate(`/changePassword`);
  };

  return (
    <Card className="rootProfile">
      <Avatar className="avatar">
        {firstName.charAt(0).toUpperCase()}
        {lastName.charAt(0).toUpperCase()}
      </Avatar>
      <Typography variant="h5">{`${logged.firstName} ${logged.lastName}`}</Typography>
      <Typography variant="subtitle1">{logged.email}</Typography>
      <Typography variant="subtitle1">Role: {logged.role}</Typography>
      <Divider />
      <CardContent>
        <form className="form" onSubmit={handleConfirm}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="lname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          {errors?.lastName && (
            <Typography color="error" variant="body2">
              {errors.lastName.message}
            </Typography>
          )}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors?.email && (
            <Typography color="error" variant="body2">
              {errors.email.message}
            </Typography>
          )}
          <CardActions>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className="submit"
            >
              Confirm Changes
            </Button>
          </CardActions>
        </form>
      </CardContent>
      <CardActions>
        <Button
          className="button2"
          variant="contained"
          color="secondary"
          onClick={handleClick}
        >
          Change Password
        </Button>
      </CardActions>
    </Card>
  );
}

export default Profile;
