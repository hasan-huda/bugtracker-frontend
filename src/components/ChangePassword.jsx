import React, { useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Typography,
} from '@mui/material';
import './ChangePassword.css'
import { URL } from "../App";


function ChangePassword(props) {
  const navigate = useNavigate();
  const { logged } = props;
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${URL}/api/users/login`, {
        email: logged.email,
        password: password,
      })
      .then((res) => {
        setSuccess(true);
        if (newPassword !== confirmPassword || newPassword.length < 8) {
          setErrors({
            confirmPassword: {
              message: "Passwords must match & need 8 or more characters",
            },
          });
        } else {
          const formUser = {
            password: newPassword,
          };
          axios
            .put(
              `${URL}/api/users/${logged._id}/password`,
              formUser
            )
            .then((res) => {
              console.log(res.data);
              navigate("/userProfile");
            })
            .catch((err) => {
              console.log(err);
              setErrors(err.response.data.errors);
            });
        }
      })
      .catch((err) => {
        console.log(err);
        setErrors({
          oPassword: {
            message: "Incorrect password",
          },
        });
      });
  };

  return (
    <>
      <Card className="root">
        <CardContent>
          <Typography className="root" variant="h5">
            Login
          </Typography>
          <form className="form" onSubmit={handleSubmit}>
            <TextField
              className="textField"
              label="Original Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            {errors?.oPassword && (
              <Typography color="error" variant="body2">
                {errors.oPassword.message}
              </Typography>
            )}
            <TextField
              className="textField"
              label="New Password"
              variant="outlined"
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
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
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
            />
            {errors?.confirmPassword && (
              <Typography color="error" variant="body2">
                {errors.confirmPassword.message}
              </Typography>
            )}
            <CardActions style={{ justifyContent: "center", display: "flex" }}>
              <Button
                className="button"
                variant="contained"
                color="primary"
                type="submit"
              >
                Update Password
              </Button>
            </CardActions>
          </form>
        </CardContent>
      </Card>
    </>
  );
}

export default ChangePassword;
