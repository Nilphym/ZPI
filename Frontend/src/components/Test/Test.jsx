import React, { useState } from 'react';

const Test = () => {
  const [testProcedures, setTestProcedures] = useState([
    'Test Procedure 1',
    'Test Procedure 2',
    'Test Procedure 3'
  ]);

  return (
    <Controller
      name={`${testPlanName}-${testName}-procedureSelect`}
      control={innerControl}
      render={({ field }) => (
        <Box>
          <InputLabel id={`${testPlanName}-${testName}-procedureSelect-label`}>
            Test Procedure
          </InputLabel>
          <Select
            labelId={`${testPlanName}-${testName}-procedureSelect-label`}
            id={`${testPlanName}-${testName}-procedureSelect`}
            label="Test Procedure"
            {...field}
          >
            {testProcedures.map((testProcedure) => (
              <MenuItem value={testProcedure}>{testProcedure}</MenuItem>
            ))}
          </Select>
        </Box>
      )}
    />
  );
};

export default Test;
