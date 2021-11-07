import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer
} from '@mui/material';

const TestDataModal = ({ handleClose, open, content }) => {
  return (
    content && (
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>{content.name}</DialogTitle>
        <DialogContent>
          <TableContainer sx={{ border: '1px solid rgba(224, 224, 224, 1)', borderRadius: '4px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  {content.data[0].map((heading) => (
                    <TableCell key={heading}>{heading}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {content.data.slice(1).map((row) => (
                  <TableRow key={row[0]}>
                    {row.map((value) => (
                      <TableCell key={value}>{value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    )
  );
};

TestDataModal.propTypes = {
  handleClose: PropTypes.func.isRequired,
  open: PropTypes.bool,
  content: PropTypes.object
};

TestDataModal.defaultProps = {
  open: false,
  content: null
};

export const TestDataCell = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [chosenDataItem, setChosenDataItem] = useState(null);

  const handleTestDataShow = async (dataItem) => {
    setChosenDataItem(dataItem);
    setOpen(true);
  };

  return (
    <>
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {data?.map((dataItem) => (
          <Button
            onClick={() => handleTestDataShow(dataItem)}
            key={dataItem.code}
            color="primary"
            sx={{ whiteSpace: 'nowrap' }}
          >
            {dataItem.code}
          </Button>
        ))}
      </Box>
      <TestDataModal open={open} handleClose={() => setOpen(false)} content={chosenDataItem} />
    </>
  );
};

TestDataCell.propTypes = {
  data: PropTypes.array
};

TestDataCell.defaultProps = {
  data: []
};

export default TestDataCell;
