import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Button,
} from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import './OwnProject.css'
import { URL } from "../App";



function OwnProjects(props) {
  const { logged } = props;
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  const handleNewProject = (e) => {
    e.preventDefault();
    navigate("/newProject");
  };

  useEffect(() => {
    if (logged.role === 'developer') {
      axios.get(`${URL}/api/projects/`)
        .then((res) => {
          const developerProjects = res.data.filter(project => project.users.includes(logged.id));
          setProjects(developerProjects);
        })
        .catch((err) => console.log(err));
    } else {
      axios.get(`${URL}/api/projects/`)
        .then((res) => setProjects(res.data))
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div className="root2">
      <Grid container spacing={4}>
        <Grid item xs={12}>
        <Typography variant="h4" className="header" style={{ fontWeight: "bold", marginTop: 40 }}>
            Projects
          </Typography>
          {logged.role !== "submitter" && (
            <Button
              variant="contained"
              className="button"
              style={{ marginTop: "15px"}}
              onClick={handleNewProject}
            >
              + New Project
            </Button>
          )}
        </Grid>
        <Grid item xs={12}>
          <List>
            {projects.map((project) => (
              <React.Fragment key={project._id}>
                <ListItem component={Link} to={`/projects/${project._id}`}>
                  <ListItemAvatar>
                    <Avatar alt={project.name} className="avatar">
                      <CodeIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText primary={project.name} />
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

export default OwnProjects;
