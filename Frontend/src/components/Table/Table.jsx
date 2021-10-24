import React, { useState, useMemo, Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useFilters,
  useExpanded
} from 'react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableFooter,
  TableContainer,
  TableSortLabel,
  Paper,
  Box
} from '@mui/material';

import TablePagination from './TablePagination';
import TableToolbar from './TableToolbar';
import ExpandableRow from './ExpandableRow';
import { DefaultFilter } from './CustomFilter';

const EnhancedTable = ({ title, data, columns, initialPageSize }) => {
  const defaultColumn = useMemo(() => ({ Filter: DefaultFilter }), []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    preGlobalFilteredRows,
    setGlobalFilter,
    visibleColumns,
    state: { pageIndex, globalFilter }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageSize: initialPageSize },
      getSubRows: (row) => row.subRows
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
    useExpanded,
    usePagination
  );

  const [dense, setDense] = useState(false);

  return (
    <TableContainer
      sx={{
        minHeight: '100vh',
        display: 'grid',
        gridTemplateRows: 'min-content 1fr'
      }}
    >
      <TableToolbar
        title={title}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
        dense={dense}
        setDense={setDense}
      />
      <Table size={dense ? 'medium' : 'small'} {...getTableProps()}>
        <Paper component={TableHead} elevation={2} square>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell
                  sx={{
                    minWidth: column.minWidth,
                    maxWidth: column.maxWidth,
                    textAlign: column.align
                  }}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  {column.disableFilters ? null : (
                    <>
                      <TableSortLabel
                        active={column.isSorted}
                        direction={column.isSortedDesc ? 'desc' : 'asc'}
                      />
                      <Box height="0.6rem" />
                      {column.render('Filter')}
                    </>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </Paper>
        <TableBody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return row.originalSubRows ? (
              <React.Fragment key={row.getRowProps().key}>
                <TableRow role={row.getRowProps().role}>
                  {row.cells.map((cell) => (
                    <TableCell
                      sx={{
                        minWidth: cell.column.minWidth,
                        maxWidth: cell.column.maxWidth,
                        textAlign: cell.column.align
                      }}
                      {...cell.getCellProps()}
                    >
                      {cell.render('Cell')}
                    </TableCell>
                  ))}
                </TableRow>
                <ExpandableRow
                  colSpan={visibleColumns.length}
                  data={row.originalSubRows[0]}
                  open={row.isExpanded}
                />
              </React.Fragment>
            ) : null;
          })}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={Object.keys(data[0]).length}>
              <TablePagination
                canPreviousPage={canPreviousPage}
                canNextPage={canNextPage}
                pageCount={pageCount}
                page={pageIndex}
                onPageChange={gotoPage}
                preGlobalFilteredRows={preGlobalFilteredRows}
                title={title}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

EnhancedTable.propTypes = {
  title: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  columns: PropTypes.array.isRequired,
  initialPageSize: PropTypes.number.isRequired
};

export default EnhancedTable;
