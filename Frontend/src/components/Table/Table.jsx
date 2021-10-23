import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useTable, usePagination, useSortBy, useGlobalFilter, useFilters } from 'react-table';
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
import { DefaultFilter } from './CustomFilter';

const EnhancedTable = ({ title, data, columns, initialPageSize }) => {
  const defaultColumn = useMemo(() => ({ Filter: DefaultFilter }), []);

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, globalFilter }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      initialState: { pageSize: initialPageSize }
    },
    useFilters,
    useGlobalFilter,
    useSortBy,
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
                  {...(column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                >
                  {column.render('Header')}
                  {column.id !== 'selection' ? (
                    <TableSortLabel
                      active={column.isSorted}
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  ) : null}
                  <Box height="0.6rem" />
                  {column.canFilter ? column.render('Filter') : null}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </Paper>
        <TableBody>
          {page.map((row) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>;
                })}
              </TableRow>
            );
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
