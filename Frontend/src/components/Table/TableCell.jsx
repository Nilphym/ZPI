import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@mui/material';

import ButtonTableCell from './ButtonTableCell';

const EnhancedTableCell = ({ content, headCell: { button, isHeading, width, alignCenter } }) =>
  button ? (
    <ButtonTableCell icon={button} />
  ) : (
    <TableCell
      sx={{ width }}
      align={alignCenter ? 'center' : 'left'}
      component={isHeading ? 'th' : undefined}
      scope={isHeading ? 'row' : undefined}
    >
      {content}
    </TableCell>
  );

export default EnhancedTableCell;

EnhancedTableCell.propTypes = {
  content: PropTypes.any.isRequired,
  headCell: PropTypes.shape({
    button: PropTypes.string,
    isHeading: PropTypes.bool,
    width: PropTypes.string,
    alignCenter: PropTypes.bool
  }).isRequired
};
