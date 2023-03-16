import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  Button,
  Select,
  MenuItem,
} from '@mui/material';
import './OneTicket.css'
import { URL } from "../App";


function OneTicket(props) {
  const { logged } = props;
  const navigate = useNavigate();
  const { id } = useParams();
  const [ticket, setTicket] = useState(null);
  const [submitterOne, setSubmitterOne] = useState(null);
  const [developer, setDeveloper] = useState(null);
  const [flag, setFlag] = useState(false);
  const [project, setProject] = useState(null);

  useEffect(() => {
    axios.get(`${URL}/api/tickets/${id}`).then((res) => {
      setTicket(res.data);
      setFlag(!flag);
    });
  }, [id]);

  useEffect(() => {
    if (ticket && ticket.submitter) {
      axios
        .get(`${URL}/api/users/${ticket.submitter}`)
        .then((res) => {
          console.log(res);
          setSubmitterOne(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [flag]);

  useEffect(() => {
    if (ticket && ticket.developer) {
      axios
        .get(`${URL}/api/users/${ticket.developer}`)
        .then((res) => setDeveloper(res.data))
        .catch((err) => console.log(err));
    }
  }, [flag]);

  useEffect(() => {
    if (ticket && ticket.project) {
      axios
        .get(`${URL}/api/projects/${ticket.project}`)
        .then((res) => setProject(res.data))
        .catch((err) => console.log(err));
    }
  }, [flag]);

  const handleDelete = () => {
    axios
      .delete(`${URL}/api/tickets/${id}`)
      .then(() => {
        navigate("/tickets");
      })
      .catch((err) => console.log(err));
  };

  const handleAddUsers = (e) => {
    e.preventDefault();
    navigate(`/tickets/${id}/addDev`);
  };

  if (!ticket) return null;

  return (
    <div className="root2">
      <Grid container spacing={3}  style={{ marginTop: 20 }}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h4" component="h2">
                {ticket.title}
                {project && (
                  <Typography variant="h6" color="textSecondary">
                    {"(Project): " + project.name}
                  </Typography>
                )}
              </Typography>
              <Divider />
              <Typography color="textSecondary" className="mTop" style={{marginTop: '10px'}}>
                Ticket Status:{" "}
                <Select
                  value={ticket.status}
                  style={{ marginLeft : 7 }}
                  onChange={(e) => {
                    setTicket({ ...ticket, status: e.target.value });
                  }}
                >
                  <MenuItem value={"Unresolved"}>Unresolved</MenuItem>
                  <MenuItem value={"Resolved"}>Resolved</MenuItem>
                </Select>
              </Typography>
              <Typography color="textSecondary" className="mBottom" style={{marginTop: '5px', marginBottom: '20px'}}>
                Priority:{" "}
                <Select
                  value={ticket.priority}
                  onChange={(e) => {
                    setTicket({ ...ticket, priority: e.target.value });
                  }}
                  style={{ marginLeft : 50 }}
                >
                  <MenuItem value={"Low"}>Low</MenuItem>
                  <MenuItem value={"Medium"}>Medium</MenuItem>
                  <MenuItem value={"High"}>High</MenuItem>
                  <MenuItem value={"Urgent"}>Urgent</MenuItem>
                </Select>
              </Typography>
              <Divider />
              <Typography variant="body1" component="p" className="mTop" style={{marginTop: '10px', marginBottom: '10px'}}>
                {ticket.description}
              </Typography>
              <Divider />
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    gutterBottom
                  >
                    Submitter
                  </Typography>
                  {submitterOne ? (
                    <Typography variant="body1" component="p">
                      {submitterOne.firstName} {submitterOne.lastName}
                    </Typography>
                  ) : (
                    <Typography variant="body1" component="p">
                      Submitter Account no longer exists
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    gutterBottom
                  >
                    Developer
                  </Typography>
                  {developer ? (
                    <Typography variant="body1" component="p">
                      {developer.firstName} {developer.lastName}
                    </Typography>
                  ) : logged.role === "Admin" ||
                    logged.role === "Project Manager" ? (
                    <Typography variant="body2" component="p">
                      <Button
                        className="button2"
                        variant="contained"
                        size="small"
                        onClick={handleAddUsers}
                      >
                        Assign Developer
                      </Button>
                    </Typography>
                  ) : (
                    <Typography variant="body2" component="p">
                      N/A
                    </Typography>
                  )}
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    gutterBottom
                  >
                    Created At
                  </Typography>
                  <Typography variant="body1" component="p">
                    {new Date(ticket.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    gutterBottom
                  >
                    Updated At
                  </Typography>
                  <Typography variant="body1" component="p">
                    {new Date(ticket.updatedAt).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                color="primary"
                className="button"
                style={{marginRight : 10}}
                onClick={() => {
                  axios
                    .put(`${URL}/api/tickets/${id}`, ticket)
                    .then(() => navigate("/tickets"))
                    .catch((err) => console.log(err));
                }}
              >
                Save Changes
              </Button>
              <Button
                className="button"
                variant="contained"
                color="secondary"
                onClick={handleDelete}
              >
                Delete
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default OneTicket;
