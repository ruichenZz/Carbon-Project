import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";

//import material ui stuffes
import AppBar from "@mui/material/AppBar";
import { Box, Grid, Paper } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

import Dashboard from "./components/Dashboard";
import GrapesJsEditor from "./components/GraphJsEditor";
import AdminPage from "./components/Admin";

import Create from './components/Dashboard/Create';


const App = () => {
  const [value, setValue] = React.useState(0);
  const [isAdmin, setIsAdmin] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  axios.get(`http://localhost:3000/api/admin/is_admin`).then((res) => {
    console.log(res);
    setIsAdmin(1);
    console.log("is admin: ", isAdmin);
  });

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ flexGrow: 1, minHeight: 80 }}>
          {" "}
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h5" component="div" sx={{ flexGrow: 2 }}>
              Carbon Project
            </Typography>
            {/* <Create />
          <Button color="inherit"></Button>
          <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              color: "white",
            }}
          >
            {" "}
            ad
          </Typography>
        </Grid>
        <Route path="/">
          <Grid item xs={2}>
            <Tabs value={value} onChange={handleChange} orientation="vertical">
              <Tab icon={<DashboardIcon />} label="Dashboard" component={Link} to="/"/>
              {isAdmin ? <Tab icon={<AdminPanelSettingsIcon />} label="Administrator" component={Link} to="/admin"/> : null}
            </Tabs>
            {/* <Create /> */}
          </Grid>
        </Route>

        <Grid item xs={9}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/edit/:id" component={GrapesJsEditor} />
            <Route path="/admin" component={AdminPage} />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
};

export default hot(App);
