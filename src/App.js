import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route } from "react-router";

import Dashboard from "./components/Dashboard";

import GrapesJsEditor from "./components/GraphJsEditor";
import AdminPage from "./components/Admin";

function App() {
  return (
    <div className="App">
      {/* <Nav /> */}
      <Switch>
        <Route exact path="/" component={Dashboard} />
        <Route path="/edit/:id" component={GrapesJsEditor} />
        <Route path="/admin" component={AdminPage} />
      </Switch>
    </div>
  );
}

export default hot(App);
