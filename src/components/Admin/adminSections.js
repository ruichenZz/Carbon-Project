import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Typography,
  Button,
  Paper,
  Container,
  TableCell,
  TableRow,
  TableContainer,
  TableBody,
  Table,
  TableHead,
} from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  paper: {
    width: "100%",
    height: "20%",
  },
});

const AdminSection = (props) => {
  const classes = useStyles();
  const [sections, setSections] = useState([]);

  return (
    <>
      <Grid container spacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Paper
          align="center"
          gutterBottom
          sx={{ p: 2 }}
          className={classes.paper}
          elevation={0}
        >
          {/* <Button align="center" size="large" variant="contained">
            CREATE SECTION
          </Button> */}
        </Paper>
        <Container>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Section Name</TableCell>
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sections.map((section, index) => {
                  return <></>;
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </Grid>
    </>
  );
};

export default withRouter(AdminSection);
