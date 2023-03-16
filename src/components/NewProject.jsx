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
import "./NewProject.css";
import { URL } from "../App";

function NewProject() {
  const [errors, setErrors] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const formProject = { name: name, description: description };
    axios
      .post(`${URL}/api/projects`, formProject)
      .then((res) => {
        console.log(res.data);
        navigate("/projects");
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <Card className="root6">
      <CardContent>
        <Typography className="title" variant="h5">
          Create Project
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            className="textField2"
            label="Name"
            variant="outlined"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {errors?.name && (
            <Typography color="error" variant="body2">
              {errors.name.message}
            </Typography>
          )}
          <TextField
            className="textField2"
            label="Description"
            multiline
            minRows={4}
            variant="outlined"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          {errors?.description && (
            <Typography color="error" variant="body2">
              {errors.description.message}
            </Typography>
          )}
          <Button
            className="button3"
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginTop: "10px" }}
          >
            Create
          </Button>
        </form>
      </CardContent>
      <CardActions>
        <Typography>
          <Link to={"/projects"}>Back To Projects</Link>
        </Typography>
      </CardActions>
    </Card>
  );
}

export default NewProject;
