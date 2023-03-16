import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
  Button,
  Typography
} from "@mui/material";
import {  Person, PostAdd } from "@mui/icons-material";
import './SubmitterDashboard.css'

const SubmitterDashboard = () => {
  const navigate = useNavigate();

  const handleNewProject = () => {
    navigate("/newProject");
  };

  const handleNewTicket = () => {
    navigate("/newTicket");
  };
  return (
    <div className="root2" >
      <Typography variant="h4" className="header"  style={{ fontWeight: "bold", marginTop: 40 }}>
            Dashboard
          </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewProject}
        style={{ marginRight: "10px", marginTop: "10px", marginBottom: "10px"}}
      >
        + New Project
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewTicket}
        style={{ marginTop: "10px",marginBottom: "10px" }}
      >
        + New Ticket
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className="card">
            <CardHeader title="My Tickets" />
            <CardContent>
              <IconButton component={Link} to="/tickets">
                <PostAdd className="icon" />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className="card">
            <CardHeader title="User Profile" />
            <CardContent>
              <IconButton component={Link} to="/userProfile">
                <Person className="icon" />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default SubmitterDashboard;
