import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

let rows = [];

/**
 * A compering function for the sorting
 */
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

/**
 * Sorting function that sorts the array according to a sorting function as 'cmp'
 */
function stableSort(array, cmp) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = cmp(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map(el => el[0]);
}

/**
 * The 'cmp' function. The output can be flipped for ascending or descending.
 */
function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const headCells = [
  {id: 'name', numeric: false, disablePadding: true, label: 'Name'},
  {id: 'address', numeric: false, disablePadding: false, label: 'Address'},
  {id: 'city', numeric: false, disablePadding: false, label: 'City'},
  {id: 'country', numeric: false, disablePadding: false, label: 'Country'},
  {id: 'distance', numeric: true, disablePadding: false, label: 'Distance'},
];

function EnhancedTableHead(props) {
  const {order, orderBy, onRequestSort} = props;
  const createSortHandler = property => event => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              href={'#'}
              active={orderBy === headCell.id}
              direction={order}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span style={{
                  border: 0,
                  clip: 'rect(0 0 0 0)',
                  height: 1,
                  margin: -1,
                  overflow: 'hidden',
                  padding: 0,
                  position: 'absolute',
                  top: 20,
                  width: 1,
                }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function EnhancedTable(data) {
  rows = data.rows;

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');

  function handleRequestSort(event, property) {
    const isDesc = orderBy === property && order === 'desc';
    setOrder(isDesc ? 'asc' : 'desc');
    setOrderBy(property);
  }

  return (
    <div style={{margin: '20px 50px'}}>
      <Table
        aria-labelledby="tableTitle"
        size={'medium'}
      >
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          rowCount={rows.length}
        />
        <TableBody>
          {stableSort(rows, getSorting(order, orderBy))
            .map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  tabIndex={-1}
                  key={row.name}
                >
                  <TableCell component="th" id={labelId} scope="row" padding="none">
                    {row.name}
                  </TableCell>
                  <TableCell align="left">{`${row.address.no} ${row.address.street}`}</TableCell>
                  <TableCell align="left">{row.address.city}</TableCell>
                  <TableCell align="left">{row.address.country}</TableCell>
                  <TableCell align="right">{row.distance}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>
    </div>
  );
}
