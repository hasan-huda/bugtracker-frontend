import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  TextField,
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
import './NewTicket.css'
import { URL } from "../App";

function NewTicket(props) {
  const [errors, setErrors] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("low");
  const [projectId, setProjectId] = useState("");
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("Unresolved");
  const { logged } = props;
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${URL}/api/projects`)
      .then((res) => {
        setProjects(res.data);
        if (res.data.length > 0) {
          setProjectId(res.data[0]._id);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formTicket = { 
      title, 
      description, 
      submitter: logged,
      status,
      priority, 
      project: projectId,
    };
    try {
      const res = await axios.post(`${URL}/api/tickets`, formTicket);
      const newTicket = res.data;
      console.log(newTicket);
      const projectRes = await axios.get(`${URL}/api/projects/${projectId}`);
      const project = projectRes.data;
      project.tickets.push(newTicket._id);
      await axios.put(`${URL}/api/projects/${projectId}`, project);
      navigate("/tickets");
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.errors);
    }
  };
  
  return (
    <Card className="root5">
      <CardContent>
        <Typography className="title" variant="h5">
          Create Ticket
        </Typography>
        <form className="form" onSubmit={handleSubmit}>
          <TextField
            className="textField"
            label="Title"
            variant="outlined"
            value={title}
            style={{ width: "100%", marginBottom: 10 }}
            onChange={(event) => setTitle(event.target.value)}
          />
          {errors?.title && (
            <Typography color="error" variant="body2">
              {errors.title.message}
            </Typography>
          )}
          <TextField
            className="textField"
            label="Description"
            multiline
            minRows={4}
            variant="outlined"
            style={{ width: "100%", marginBottom: 10 }}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
          {errors?.description && (
            <Typography color="error" variant="body2">
              {errors.description.message}
            </Typography>
          )}
          <FormControl className="textField"  >
            <InputLabel htmlFor="project">Project</InputLabel>
            <Select
              value={projectId}
              style={{ width: "100%", marginBottom: 10 }}
              onChange={(event) => setProjectId(event.target.value)}
              inputProps={{
                name: "projectId",
                id: "project",
              }}
            >
              {projects.map((project) => (
                <MenuItem key={project._id} value={project._id}>
                  {project.name}
                </MenuItem>
              ))}
            </Select>
            {errors?.projectId && (
              <Typography color="error" variant="body2">
                {errors.projectId.message}
              </Typography>
            )}
          </FormControl>
          <FormControl className="textField">
            <InputLabel htmlFor="priority">Priority</InputLabel>
            <Select
              value={priority}
              style={{ width: "100%", marginBottom: 10 }}
              onChange={(event) => setPriority(event.target.value)}
              inputProps={{
                name: "priority",
                id: "priority",
              }}
            >
              <MenuItem value="Low">Low</MenuItem>
              <MenuItem value="Medium">Medium</MenuItem>
              <MenuItem value="High">High</MenuItem>
              <MenuItem value="Urgent">Urgent</MenuItem>
            </Select>
            {errors?.priority && (
              <Typography color="error" variant="body2">
                {errors.priority.message}
              </Typography>
            )}
          </FormControl>
          <Button
            className="button"
            variant="contained"
            color="primary"
            type="submit"
          >
            Create
          </Button>
        </form>
      </CardContent>
      <CardActions>
        <Typography>
          <Link to={`/tickets`}>Back To Tickets</Link>
        </Typography>
      </CardActions>
    </Card>
  );
}

export default NewTicket;
