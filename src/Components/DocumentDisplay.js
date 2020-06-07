import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { Link } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 450,
  },
});

export default function SimpleTable(props) {
  const classes = useStyles();

  return (

    <TableContainer  component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="center">Document title</TableCell>
            <TableCell align="center">Document hash</TableCell>
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.data.map((row) => (
            <TableRow key={row.id}>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">{row.hash}</TableCell>
              <TableCell align="center"><Link href={"/documents/" + row.id + "/details"}> View </Link> </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
