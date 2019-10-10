import React, { useEffect, useState } from 'react';
import jsonp from 'jsonp';

import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const baseUrl = 'https://demo1-webservice.eventbase.com/v4/admin/events/frontendcodechallenge/sessions';
const auth = '?api=cc1-0befd4410327ac7b8c7f88e4ed466e87d6f78eff29de81c3ee4e28d79b604eb2-0c75664d5c8211b4395e7f766a415a25827c7cf2';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    overflow: 'auto',
  },
});

const SessionList: React.FC = () => {
  const classes = useStyles();

  const [sessions, setSessions] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      jsonp(baseUrl+auth, (err, data) => {
        if(err) {
          console.log(err);
        } else {
          setSessions(data.data);
        }
      });
    }

    fetchData();
  }, [])

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const columns = [{
    name: 'name',
    label: 'Name',
  }, {
    name: 'description',
    label: 'Description',
  }, {
    name: 'time_start',
    label: 'Time Start',
  }, {
    name: 'time_stop',
    label: 'Time Stop',
  }]
  return (
    <>
      <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              {columns.map(col => (
                <TableCell>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.map(session => {
              return (
                <TableRow tabIndex={-1}>
                  {columns.map(column => {
                    const value = session[column.name];
                      return (
                        <TableCell >
                          {value}
                        </TableCell>
                      );
                  })}
                </TableRow>);
            })}
          </TableBody>
        </Table>
      </div>
    </Paper>
    </>
  );
}

export default SessionList;