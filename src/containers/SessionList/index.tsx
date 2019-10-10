import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { request } from '../../utils/api';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  tableWrapper: {
    overflow: 'auto',
  },
  header: {
    backgroundColor: '#fff',
  },
  columnText: {
    color: '#263238',
  }
});

const dateRangePickerStyle = {
  margin: '10px',
  backgroundColor: '#fff',
};
const divider = {
  marginTop: '50px',
}


interface EventData {
  id: string;
  name: string;
  description: string;
  time_start: string;
  time_stop: string;
}

interface SessionsResult {
  data: EventData[];
  meta: { total: number };
}

interface SearchOptions {
  page: number;
  rowsPerPage: number;
  text?: string;
  from?: string;
  until?: string;
}

const columns: Array<{ name: keyof EventData, label: string }> = [{
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

const SessionList: React.FC = () => {
  const classes = useStyles();

  const [sessions, setSessions] = useState({ data: [], meta: { total: 0 } } as SessionsResult);
  const [status, setStatus] = useState({ loading: false, error: null });
  const [searchOptions, setSearchOptions] = React.useState({ page: 0, rowsPerPage: 10 } as SearchOptions);
  const [searchText, setSearchText] = useState();

  useEffect(() => {
    const query = {
      page: searchOptions.page,
      per_page: searchOptions.rowsPerPage,
      search: searchOptions.text,
    };
    console.log(query);
    setStatus({ loading: true, error: null });
    request('/sessions', query, (error, data) => {
      if(error) {
        setStatus({ loading: false, error });
      } else {
        setStatus({ loading: false, error: null });
        setSessions(data);
      }
    });
  }, [searchOptions]);

  const onSearchClick = (event: any) => {

    setSearchOptions({ ...searchOptions, text: searchText});
    event.preventDefault();
  }

  if(status.loading) {
    return <h1>Loading</h1>
  }

  if(status.error) {
    return <div>{status.error}</div>
  }

  return (
    <>       
      <form onSubmit={onSearchClick}>
        <label>
          Name:
          <input type="text" value={searchText} onChange={(event) => setSearchText(event.target.value)} />
        </label>
        <input style={{margin: '10px'}} type="submit" value="Search" />
      </form>
          
      <div style={divider}></div>
      <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table>
          <TableHead className={classes.header}>
            <TableRow > 
              {columns.map(col => (
                <TableCell>
                  {col.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {sessions.data.map((session) => {
              return (
                <TableRow tabIndex={-1}>
                  {columns.map(column => {
                    const value = session[column.name];
                      return (
                        <TableCell>
                          {column.name === 'name'
                            ? <Link className={classes.columnText} to={`/session/${session.id}`}>{value}</Link>
                            : value}
                        </TableCell>
                      );
                  })}
                </TableRow>);
            })}
          </TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={sessions.meta.total}
        rowsPerPage={searchOptions.rowsPerPage}
        page={searchOptions.page}
        backIconButtonProps={{
          'aria-label': 'previous page',
        }}
        nextIconButtonProps={{
          'aria-label': 'next page',
        }}
        onChangePage={(event, page) => setSearchOptions({ ...searchOptions, page })}
        onChangeRowsPerPage={(event) => setSearchOptions({ ...searchOptions, rowsPerPage: parseInt(event.target.value, 10) })}
      />
    </Paper>
    </>
  );
}

export default SessionList;