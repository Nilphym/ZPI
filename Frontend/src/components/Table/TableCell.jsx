import React from 'react';
import { TableCell } from '@mui/material';

import ButtonTableCell from './ButtonTableCell';

const EnhancedTableCell = ({ content, rowCell: { isButton, icon, isHeading, width, align } }) => {
  if (isButton) {
    return <ButtonTableCell icon={icon} />
  }

  return (
    <TableCell
      sx={{ width: width }}
      align={align}
      component={isHeading ? 'th' : undefined}
      scope={isHeading ? 'row' : undefined}
    >
      {content}
    </TableCell>
  )
}

export default EnhancedTableCell;
