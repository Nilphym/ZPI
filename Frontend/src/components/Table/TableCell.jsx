import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@mui/material';

import ButtonTableCell from './ButtonTableCell';

const EnhancedTableCell = ({ content, rowCell: { isButton, icon, isHeading, width, align } }) => {
  if (isButton) {
    return <ButtonTableCell icon={icon} />;
  }

  return (
    <TableCell
      sx={{ width }}
      align={align}
      component={isHeading ? 'th' : undefined}
      scope={isHeading ? 'row' : undefined}
    >
      {content}
    </TableCell>
  );
};

export default EnhancedTableCell;

EnhancedTableCell.propTypes = {
  content: PropTypes.any.isRequired,
  rowCell: PropTypes.shape({
    isButton: PropTypes.bool,
    icon: PropTypes.string,
    isHeading: PropTypes.bool,
    width: PropTypes.string,
    align: PropTypes.string
  }).isRequired
};
