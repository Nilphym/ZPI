import React from 'react';
import PropTypes from 'prop-types';
import { TableCell } from '@mui/material';

import ButtonTableCell from './ButtonTableCell';

const EnhancedTableCell = ({
  content,
  headCell: { isButton, icon, isHeading, width, alignCenter }
}) => {
  if (isButton) {
    return <ButtonTableCell icon={icon} />;
  }

  return (
    <TableCell
      sx={{ width }}
      align={alignCenter ? 'center' : 'left'}
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
  headCell: PropTypes.shape({
    isButton: PropTypes.bool,
    icon: PropTypes.string,
    isHeading: PropTypes.bool,
    width: PropTypes.string,
    alignCenter: PropTypes.bool
  }).isRequired
};
