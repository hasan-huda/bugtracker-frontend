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
  ButtonGroup,
} from "@mui/material";
import { URL } from "../App";
import "./Authentication.css";

function Authentication(props) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { logIn } = props;
  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${URL}/api/users/login`, {
        email,
        password,
      })
      .then((res) => {
        console.log(res.data);
        logIn(res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data);
      });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    console.log(URL);
    axios
      .post(`${URL}/api/users/login`, {
        email: "admin@gmail.com",
        password: "12345678",
      })
      .then((res) => {
        console.log(res.data);
        logIn(res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data);
      });
  };
  const handlePMLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${URL}/api/users/login`, {
        email: "pm@gmail.com",
        password: "qweasdzxc",
      })
      .then((res) => {
        console.log(res.data);
        logIn(res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data);
      });
  };
  const handleDevLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${URL}/api/users/login`, {
        email: "dev@gmail.com",
        password: "qweasdzxc",
      })
      .then((res) => {
        console.log(res.data);
        logIn(res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data);
      });
  };
  const handleSubLogin = (e) => {
    e.preventDefault();
    axios
      .post(`${URL}/api/users/login`, {
        email: "sub@gmail.com",
        password: "qweasdzxc",
      })
      .then((res) => {
        console.log(res.data);
        logIn(res.data);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data);
      });
  };

  return (
    <>
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
        <CardContent
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography
            className="title"
            variant="h5"
            style={{ marginBottom: "1rem" }}
          >
            Login
          </Typography>
          {errors && (
            <Typography
              color="error"
              variant="body2"
              className="error"
              style={{ marginBottom: "1rem", textAlign: "center" }}
            >
              {errors.message}
            </Typography>
          )}
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              className="textField"
              label="Email"
              variant="outlined"
              style={{ width: "100%", marginBottom: 10 }}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              className="textfield"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              style={{ width: "100%", marginBottom: 10 }}
              onChange={(event) => setPassword(event.target.value)}
            />
            <Button
              variant="contained"
              color="primary"
              type="submit"
              style={{ display: "block", margin: "0 auto" }}
            >
              Login
            </Button>
          </form>
        </CardContent>
        <CardActions>
          <Typography>
            Don't have an account? <Link to={"/register"}> Register here</Link>
          </Typography>
        </CardActions>
        <CardActions style={{ justifyContent: "center" }}>
          <ButtonGroup orientation="vertical">
            <Button
              className="button3"
              variant="contained"
              color="primary"
              onClick={handleAdminLogin}
            >
              Demo Admin Login
            </Button>
            <Button
              className="button3"
              variant="contained"
              color="primary"
              onClick={handlePMLogin}
            >
              Demo Project Manager
            </Button>
            <Button
              className="button3"
              variant="contained"
              color="primary"
              onClick={handleDevLogin}
            >
              Demo Developer
            </Button>
            <Button
              className="button3"
              variant="contained"
              color="primary"
              onClick={handleSubLogin}
            >
              Demo Submitter
            </Button>
          </ButtonGroup>
        </CardActions>
      </Card>
    </>
  );
}

export default Authentication;
