import React, { useEffect, useState } from "react";
import {
  Button,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar,
  Divider,
  Paper,
  ListItemAvatar,
} from '@mui/material';
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { URL } from '../App'
import './AdminDashboard.css'



const AdminDashboard = ({ logged }) => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [highPriorityTickets, setHighPriorityTickets] = useState([]);

  useEffect(() => {
    axios
      .get(`${URL}/api/tickets/`)
      .then((response) => {
        const filteredTickets = response.data.filter(
          (ticket) =>
            ticket.status === "Unresolved" &&
            (ticket.priority === "High" || ticket.priority === "Urgent")
        );
        setHighPriorityTickets(filteredTickets);
      })
      .catch((error) => {
        console.error("Error fetching tickets:", error);
      });
  }, []);

  useEffect(() => {
    axios.get(`${URL}/api/tickets/`)
      .then(response => {
        const sortedTickets = response.data.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        const recentTickets = sortedTickets.slice(0, 5);
        setTickets(recentTickets);
      })
      .catch(error => console.log(error));
  }, []);
  const handleNewProject = () => {
    navigate("/newProject");
  };

  const handleNewTicket = () => {
    navigate("/newTicket");
  };

  return (
    <div className="root2" >
      <Typography variant="h4" className="header" style={{ fontWeight: "bold", marginTop: 40 }}>
            Dashboard
          </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewProject}
        style={{ marginRight: "10px", marginTop: "20px" }}
      >
        + New Project
      </Button>
      <Button
        variant="contained"
        color="primary"
        onClick={handleNewTicket}
        style={{ marginTop: "20px" }}
      >
        + New Ticket
      </Button>
      <Grid container spacing={2} style={{ marginTop: "20px" }}>
        <Grid item xs={6} md={3}>
          <Card
            className= "clickableCard"
            onClick={() => navigate("/projects")}
          >
            <CardContent style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">My Projects</Typography>
              <ArrowForwardIcon style={{ marginLeft: "auto" }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card
            className= "clickableCard"
            onClick={() => navigate("/tickets")}
          >
            <CardContent style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">My Tickets</Typography>
              <ArrowForwardIcon style={{ marginLeft: "auto" }} />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} md={3}>
          <Card
            className= "clickableCard"
            onClick={() => navigate("/userProfile")}
          >
            <CardContent style={{ display: "flex", alignItems: "center" }}>
              <Typography variant="h6">User Profile</Typography>
              <ArrowForwardIcon style={{ marginLeft: "auto" }} />
            </CardContent>
          </Card>
        </Grid>
        {logged.role === "Admin" && (
          <Grid item xs={6} md={3}>
            <Card
              className= "clickableCard"
              onClick={() => navigate("/manageRoles")}
            >
              <CardContent style={{ display: "flex", alignItems: "center" }}>
                <Typography variant="h6">Manage Users</Typography>
                <ArrowForwardIcon style={{ marginLeft: "auto" }} />
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" style={{fontWeight: "bold"}}>High Priority Tickets:</Typography>
        <List>
          {highPriorityTickets.map((ticket) => (
            <Link
              to={`/tickets/${ticket._id}`}
              style={{ textDecoration: "none" }}
            >
              <Paper className="paper" style={{ borderRadius: '10px'}}>
                <ListItem key={ticket._id}>
                  <ListItemAvatar>
                    <Avatar style={{backgroundColor: 'red'}}>
                      <ReceiptIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        style={{ fontWeight: "bold" }}
                      >
                        {ticket.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body1">
                          Priority: {ticket.priority}
                        </Typography>
                        <Typography variant="body1">
                          Status: {ticket.status}
                        </Typography>
                        <Divider />
                        <Typography variant="body2">
                          Created At:{" "}
                          {new Date(ticket.createdAt).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </Paper>
              <Divider />
            </Link>
          ))}
        </List>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="h6" style={{fontWeight: "bold"}}>Recent Tickets:</Typography>
        <List>
          {tickets.map((ticket) => (
            <Link
              to={`/tickets/${ticket._id}`}
              style={{ textDecoration: "none" }}
            >
              <Paper className="paper" style={{ borderRadius: '10px'}}>
                <ListItem key={ticket._id}>
                  <ListItemAvatar>
                    <Avatar>
                      <ReceiptIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        variant="body1"
                        style={{ fontWeight: "bold" }}
                      >
                        {ticket.title}
                      </Typography>
                    }
                    secondary={
                      <>
                        <Typography variant="body1">
                          Priority: {ticket.priority}
                        </Typography>
                        <Typography variant="body1">
                          Status: {ticket.status}
                        </Typography>
                        <Divider />
                        <Typography variant="body2">
                          Created At:{" "}
                          {new Date(ticket.createdAt).toLocaleString()}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </Paper>
              <Divider />
            </Link>
          ))}
        </List>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
