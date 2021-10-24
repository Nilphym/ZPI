import React from 'react';
import PropTypes from 'prop-types';

import BugTable, { tableTypes } from '../containers/BugTable';

const BugPage = ({ type }) => {
  return <BugTable type={type} />;
};

export default BugPage;
export { tableTypes } from '../containers/BugTable';

BugPage.propTypes = {
  type: PropTypes.oneOf(Object.values(tableTypes)).isRequired
};
