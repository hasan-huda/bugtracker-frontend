import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from "@mui/material";
import "./Register.css";
import { URL } from "../App";

function Register(props) {
  const navigate = useNavigate();
  const [role, setRole] = useState("Submitter");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState(null);
  const { logIn } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrors({
        confirmPassword: {
          message: "Passwords must match",
        },
      });
    } else {
      axios
        .post(`${URL}/api/users`, {
          firstName,
          lastName,
          email,
          password,
          role,
        })
        .then((res) => {
          console.log(res.data);
          logIn(res.data);
          navigate("/dashboard");
        })
        .catch((err) => {
          console.log(err);
          setErrors(err.response.data.errors);
        });
    }
  };

  return (
    <Card
      className="rootAuth"
      style={{
        maxWidth: "400px",
        margin: "0 auto",
        marginTop: "50px",
        padding: "10px",
        background: "linear-gradient(to bottom right, #009688, #4DB6AC)",
        borderRadius: "20px",
        boxShadow: "5px 5px 5px rgba(0, 0, 0, 0.3)",
      }}
    >
<CardContent>
  <Typography className="title" variant="h5" style={{ textAlign: "center" }}>
    Register
  </Typography>
  <form className="form" onSubmit={handleSubmit}>
    <TextField
      className="textField"
      label="First Name"
      variant="outlined"
      value={firstName}
      style={{ width: "100%", marginBottom: 10 }}
      onChange={(event) => setFirstName(event.target.value)}
    />
    {errors?.firstName && (
      <Typography color="error" variant="body2">
        {errors.firstName.message}
      </Typography>
    )}
    <TextField
      className="textField"
      label="Last Name"
      variant="outlined"
      style={{ width: "100%", marginBottom: 10 }}
      value={lastName}
      onChange={(event) => setLastName(event.target.value)}
    />
    {errors?.lastName && (
      <Typography color="error" variant="body2">
        {errors.lastName.message}
      </Typography>
    )}
    <TextField
      className="textField"
      label="Email"
      variant="outlined"
      value={email}
      style={{ width: "100%", marginBottom: 10 }}
      onChange={(event) => setEmail(event.target.value)}
    />
    {errors?.email && (
      <Typography color="error" variant="body2">
        {errors.email.message}
      </Typography>
    )}
    <TextField
      className="textField"
      label="Password"
      variant="outlined"
      type="password"
      style={{ width: "100%", marginBottom: 10 }}
      value={password}
      onChange={(event) => setPassword(event.target.value)}
    />
    {errors?.password && (
      <Typography color="error" variant="body2">
        {errors.password.message}
      </Typography>
    )}
    <TextField
      className="textField"
      label="Confirm Password"
      variant="outlined"
      type="password"
      style={{ width: "100%", marginBottom: 10 }}
      value={confirmPassword}
      onChange={(event) => setConfirmPassword(event.target.value)}
    />
    {errors?.confirmPassword && (
      <Typography color="error" variant="body2">
        {errors.confirmPassword.message}
      </Typography>
    )}
    <Button
      className="button"
      variant="contained"
      color="primary"
      type="submit"
      style={{ display: "block", margin: "0 auto" }}
    >
      Register
    </Button>
  </form>
</CardContent>
      <CardActions>
        <Typography>
          Already have an account? <Link to={"/"}> Login here</Link>
        </Typography>
      </CardActions>
    </Card>
  );
}

export default Register;
