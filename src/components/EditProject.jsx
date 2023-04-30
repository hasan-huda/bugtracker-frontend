import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { URL } from "../App";

function EditProject(props) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    axios
      .get(`${URL}/api/projects/${id}`)
      .then((res) => {
        setProject(res.data);
        setName(res.data.name);
        setDescription(res.data.description);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedProject = {
      name,
      description,
    };
    axios
      .put(`${URL}/api/projects/${id}`, updatedProject)
      .then(() => {
        navigate(`/projects/${id}`);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      {project ? (
        <Card className="rootProfile"style={{ marginTop: 80 }}>
          <CardContent>
            <Typography variant="h5" component="h2">
              Edit Project
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="name"
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                fullWidth
                margin="normal"
              />
              <TextField
                id="description"
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                margin="normal"
                multiline
              />
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </>
  );
}

export default EditProject;
