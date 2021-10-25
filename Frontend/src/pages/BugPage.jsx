import React from 'react';
import PropTypes from 'prop-types';

import { BugTable, bugTableTypes } from '../containers';

export const BugPage = ({ type }) => {
  return <BugTable type={type} />;
};

export default BugPage;
export { bugTableTypes };

BugPage.propTypes = {
  type: PropTypes.oneOf(Object.values(bugTableTypes)).isRequired
};
