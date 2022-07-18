import React from "react";
import SingleSection from "./Sections/Single_Section";
import { withRouter } from 'react-router-dom';
import {Grid, Typography, Button, Paper} from "@mui/material"
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
    paper: {
      width: "100%",
      height: "20%"
    },
  });

const AdminSection = (props) => {
    const classes = useStyles();

    return(
        <>
        <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Paper align="center" gutterBottom  sx={{p:2}} className={classes.paper} elevation={0}>
            <Button align="center" size= "large" variant="contained" >CREATE SECTION</Button>
        </Paper>
            <SingleSection />
            <SingleSection />
        </Grid>
        </>
    );
}

export default withRouter(AdminSection);