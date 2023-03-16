import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Divider,
  Button,
  Grid,
  Paper,
} from '@mui/material';
import AddIcon from "@mui/icons-material/Add";
import ReceiptIcon from "@mui/icons-material/Receipt";
import './OwnTicket.css'
import { URL } from "../App";

function OwnTickets() {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const handleNewTicket = (e) => {
    e.preventDefault();
    navigate("/newTicket");
  };

  const getProjectNameById = async (project) => {
    try {
      const res = await axios.get(
        `${URL}/api/projects/${project}`
      );
      return res.data.name || "Unknown";
    } catch (error) {
      console.log(error);
      return "Unknown";
    }
  };

  useEffect(() => {
    axios
      .get(`${URL}/api/tickets/`)
      .then(async (res) => {
        const updatedTickets = await Promise.all(
          res.data.map(async (ticket) => {
            const projectName = await getProjectNameById(ticket.project);
            return {
              ...ticket,
              projectName,
            };
          })
        );
        setTickets(updatedTickets);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="root2">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4" style={{ fontWeight: "bold" }} >
            Tickets
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            className="button2"
            startIcon={<AddIcon />}
            onClick={handleNewTicket}
          >
            New Ticket
          </Button>
        </Grid>
        <Grid item xs={12}>
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
                            Project: {ticket.projectName}
                          </Typography>
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
      </Grid>
    </div>
  );
}

export default OwnTickets;
