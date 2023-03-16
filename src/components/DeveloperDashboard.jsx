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
} from '@mui/material';
import {  Person, Work } from "@mui/icons-material";
import './DeveloperDashboard.css'



const DeveloperDashboard = () => {
  const navigate = useNavigate();

  const handleNewTicket = () => {
    navigate("/newTicket");
  };
  return (
    <div className="root2">
      <Typography variant="h4" className="header" style={{ fontWeight: "bold" }}>
            Dashboard
          </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewTicket}
        style={{ marginTop: "10px", marginBottom: "10px" }}
      >
        + New Ticket
      </Button>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card className="card">
            <CardHeader title="My Projects" />
            <CardContent>
              <IconButton component={Link} to="/projects">
                <Work className="icon" />
              </IconButton>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
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

export default DeveloperDashboard;
