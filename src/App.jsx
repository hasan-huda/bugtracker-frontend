import React, { useState } from "react";
import { Route, useLocation, Routes, Link } from "react-router-dom";
import Authentication from "./components/Authentication";
import Dashboard from "./components/Dashboard";
import ManageRoles from "./components/ManageRoles";
import Register from "./components/Register";
import OwnProjects from "./components/OwnProjects";
import NewProject from "./components/NewProject";
import OwnTickets from "./components/OwnTickets";
import NewTicket from "./components/NewTicket";
import Profile from "./components/Profile";
import Sidebar from "./components/SideBar";
import SimpleNavbar from "./components/SimpleNavbar";
import OneProject from "./components/OneProject";
import ChangePassword from "./components/ChangePassword";
import AddDev from "./components/AddDev";
import AddUsers from "./components/AddUsers";
import OneTicket from "./components/OneTicket";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
} from "@mui/material";


export const URL = process.env.REACT_APP_SERVER_URL;

function App() {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/register"];
  const [logged, setLogged] = useState("");

  const logIn = (user) => {
    setLogged(user);
    console.log(user);
  };
  const logOut = () => {
    setLogged("");
  };

  // https://img.freepik.com/free-vector/white-gray-background-with-diagonal-lines-pattern_1017-25100.jpg?w=2000&t=st=1678751399~exp=1678751999~hmac=792476b4072d7e94caf37bb946a679d161ac1a8c7b0765eeed0c16230c9ce82b
  return (
    <div style={{ backgroundColor: "#f5f5f5", minHeight: "100vh" }}>
      {hideNavbarPaths.includes(location.pathname) ? (
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Bug Tracker
            </Typography>
            <Button component={Link} to="/register" color="inherit">
              Register
            </Button>
            <Button component={Link} to="/" color="inherit">
              Login
            </Button>
          </Toolbar>
        </AppBar>
      ) : (
        <div style={{ backgroundColor: "#3f51b5", color: "white" }}>
          <SimpleNavbar logged={logged} logOut={logOut} />
        </div>
      )}
      <div>
        <div
          style={{
            padding: "10px",
            flexGrow: 1,
            display: "flex",
            minHeight: '100vh',
            backgroundImage:
                "url(https://img.freepik.com/free-vector/white-gray-background-with-diagonal-lines-pattern_1017-25100.jpg?w=2000&t=st=1678751399~exp=1678751999~hmac=792476b4072d7e94caf37bb946a679d161ac1a8c7b0765eeed0c16230c9ce82b)",
            }}
        >
          {!hideNavbarPaths.includes(location.pathname) && (
            <Sidebar logged={logged} />
          )}
          <div
            style={{
              backgroundColor: "#f5f5f5",
              marginLeft: "10px",
              padding: "10px",
              flexGrow: 1,
              backgroundImage:
                "url(https://img.freepik.com/free-vector/white-gray-background-with-diagonal-lines-pattern_1017-25100.jpg?w=2000&t=st=1678751399~exp=1678751999~hmac=792476b4072d7e94caf37bb946a679d161ac1a8c7b0765eeed0c16230c9ce82b)",
            }}
          >
            <Routes>
              <Route
                exact
                path="/"
                element={<Authentication logged={logged} logIn={logIn} />}
              />
              <Route
                path="/register"
                element={<Register logged={logged} logIn={logIn} />}
              />
              <Route
                path="/dashboard"
                element={<Dashboard logged={logged} />}
              />
              <Route
                path="/manageRoles"
                element={<ManageRoles logged={logged} />}
              />
              <Route
                path="/projects"
                element={<OwnProjects logged={logged} />}
              />
              <Route
                path="/newProject"
                element={<NewProject logged={logged} />}
              />
              <Route
                path="/projects/:id"
                element={<OneProject logged={logged} />}
              />
              <Route
                path="/projects/:id/addUsers"
                element={<AddUsers logged={logged} />}
              />
              <Route
                path="/newTicket"
                element={<NewTicket logged={logged} />}
              />
              <Route
                path="/tickets/:id"
                element={<OneTicket logged={logged} />}
              />
              <Route
                path="/tickets/:id/addDev"
                element={<AddDev logged={logged} />}
              />
              <Route path="/tickets" element={<OwnTickets logged={logged} />} />
              <Route
                path="/changePassword"
                element={<ChangePassword logged={logged} />}
              />
              <Route
                path="/userProfile"
                element={<Profile logged={logged} logIn={logIn} />}
              />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
