import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import axios from "axios";
import {
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  CardActions,
  Button,
  ListItemAvatar,
  Avatar,
  Grid,
} from '@mui/material';
import ReceiptIcon from "@mui/icons-material/Receipt";
import './OneProject.css'
import { URL } from "../App";

function OneProject(props) {
  const { id } = useParams();
  const { logged } = props;
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [flag, setFlag] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get(`${URL}/api/projects/${id}`)
      .then((res) => {
        setProject(res.data);
        setFlag(!flag);
      })
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    axios
      .get(`${URL}/api/users`)
      .then((res) => {
        const filteredUsers = res.data.filter((user) =>
          project.users.includes(user._id)
        );
        setUsers(filteredUsers);
      })
      .catch((err) => console.log(err));
  }, [flag, id]);

  useEffect(() => {
    axios
      .get(`${URL}/api/tickets`)
      .then((res) => {
        const filteredTickets = res.data.filter((ticket) =>
          project.tickets.includes(ticket._id)
        );
        console.log(filteredTickets);
        setTickets(filteredTickets);
      })
      .catch((err) => console.log(err));
  }, [flag]);

  const handleEdit = (e) => {
    e.preventDefault();
    navigate(`/projects/${id}/edit`);
  };

  const handleDelete = () => {
    axios
      .delete(`${URL}/api/projects/${id}`)
      .then(() => {
        navigate("/projects");
      })
      .catch((err) => console.log(err));
  };
  const handleAddUsers = (e) => {
    e.preventDefault();
    navigate(`/projects/${id}/addUsers`);
  };

  return (
    <>
      {project ? (
        <Card className="rootProfile"  style={{ marginTop: 20 }}>
          <CardContent>
            <Typography className="title" variant="h5">
              {project.name}
            </Typography>
            <Divider />
            <Typography className="desc" variant="body1" style={{marginTop : 10, marginBottom : 10}}>
              {project.description}
            </Typography>
            <Divider />
            <Typography className="desc2" variant="h6" align="center">
              Users:
            </Typography>
            {(logged.role === "Admin" || logged.role === "Project Manager") && (
              <Grid container alignItems="center" justifyContent="center">
                <Button
                  className="button"
                  variant="contained"
                  onClick={handleAddUsers}
                  style={{marginBottom : 15}}
                >
                  Modify Users
                </Button>
              </Grid>
            )}
            {users.map((user) => (
              <div
                key={user._id}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className="pos"
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography
                  variant="body1"
                  color="textSecondary"
                  className="pos"
                >
                  {user.role}
                </Typography>
              </div>
            ))}
            <Divider />
            <Typography className="desc" variant="h6" align="center">
              Tickets:
            </Typography>
            <Grid item xs={12}>
              <List>
                {tickets.map((ticket) => (
                  <React.Fragment key={ticket._id}>
                    <ListItem component={Link} to={`/tickets/${ticket._id}`}>
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
                            <Typography variant="body2">
                              Created At:{" "}
                              {new Date(ticket.createdAt).toLocaleString()}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            </Grid>
          </CardContent>
          <Divider />
          <CardActions style={{ display: "flex", justifyContent: "center" }}>
            <Button
              className="button"
              variant="contained"
              color="primary"
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              className="button"
              variant="contained"
              color="secondary"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </CardActions>
        </Card>
      ) : (
        <Typography variant="body1">Loading...</Typography>
      )}
    </>
  );
}

export default OneProject;
