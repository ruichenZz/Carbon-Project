
//Matrial UI components
import {Grid, Button, Typography} from "@mui/material"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

const SingleSection = (props) => {

    return(
        <>
        <Grid item xs = {6} >
        <TableContainer component={Paper}>
      <Table>
        <TableHead>
        <TableRow>
            <StyledTableCell>
              <Typography variant="h6"
              sx={{ 
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 800,
              color: 'inherit',
              textDecoration: 'none',
              
               }}
              >Sections: </Typography>
            </StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            <StyledTableCell></StyledTableCell>
            </TableRow>

          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell >Status</StyledTableCell>
            <StyledTableCell align="center">Promote</StyledTableCell>
            <StyledTableCell align="center">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        <StyledTableRow >
              <StyledTableCell component="th" scope="row">
                Yuki Lin
              </StyledTableCell>
              <StyledTableCell align="right">Admin</StyledTableCell>
              <StyledTableCell align="right">
                <Button size="small" color="success" variant="outlined" >
                  Promote
                </Button>
              </StyledTableCell>
              <StyledTableCell align="right">
              <Button size="small" color="error" variant="outlined" align="right">
                  Delete
                </Button>
              </StyledTableCell>
              
        </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
        </Grid>
        </>
    );
}

export default SingleSection;