import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import Create from "./Create";
import Dash from "./Dashboard";

const Dashboard = (props) => {
  return (
    <>

      <Dash />
    </>
  );
};

export default withRouter(Dashboard);
