import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  TableRow,
  TableCell,
  Collapse,
  Box,
  MenuItem,
  TextField,
  Button,
  Select,
  FormControl,
  InputLabel
} from '@mui/material';
import { blue } from '@mui/material/colors';
import { DesktopDatePicker } from '@mui/lab';
import { Controller, useForm, FormProvider, useFormContext } from 'react-hook-form';

const Field = ({ id, label, type, value, possibleValues }) => {
  const { control, setValue } = useFormContext();
  const [date, setDate] = useState(null);

  switch (type) {
    case 'text':
      return (
        <Controller
          defaultValue={value}
          control={control}
          name={id}
          render={({ field }) => <TextField size="small" id={id} label={label} {...field} />}
        />
      );
    case 'textLarge':
      return (
        <Controller
          control={control}
          defaultValue={value}
          name={id}
          render={({ field }) => (
            <TextField
              sx={{ gridColumn: 'span 4', gridRow: 'span 2' }}
              multiline
              rows={3}
              id={id}
              label={label}
              {...field}
            />
          )}
        />
      );
    case 'date':
      return (
        <Controller
          control={control}
          defaultValue={value}
          name={id}
          render={({ field }) => (
            <DesktopDatePicker
              label={label}
              inputFormat="MM/dd/yyyy"
              value={date}
              renderInput={(params) => <TextField size="small" {...params} />}
              {...field}
              onChange={(date) => {
                setDate(date);
                setValue(id, date.toLocaleString());
              }}
            />
          )}
        />
      );
    case 'select':
      return (
        <FormControl size="small">
          <InputLabel id={id}>{label}</InputLabel>
          <Controller
            control={control}
            name={id}
            defaultValue={value}
            render={({ field }) => (
              <Select labelId={id} id={id} label={label} {...field}>
                {possibleValues.map((value) => (
                  <MenuItem key={value} value={value}>
                    {value}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
        </FormControl>
      );
    default:
      throw new Error('Wrong field type');
  }
};

Field.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  value: PropTypes.string,
  possibleValues: PropTypes.array
};

Field.defaultProps = {
  possibleValues: null,
  value: null
};

const EnhancedTableRow = ({ colSpan, data, open, onSubmit }) => {
  const formMethods = useForm();
  const { handleSubmit, setValue } = formMethods;

  useEffect(() => {
    if (data) setValue(data.id, data[data.id]);
  }, []);

  return (
    <TableRow>
      <TableCell style={{ padding: 0 }} colSpan={colSpan}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Box
                sx={{
                  backgroundColor: blue[50],
                  display: 'grid',
                  gridTemplate: 'repeat(5, 1fr) / repeat(4, 1fr) 6rem',
                  gap: '1rem 4rem',
                  padding: '2rem 6rem'
                }}
              >
                {data &&
                  data.fields.map(({ id, label, type, value, possibleValues }) => (
                    <Field
                      key={id}
                      id={id}
                      label={label}
                      type={type}
                      value={value}
                      possibleValues={possibleValues}
                    />
                  ))}
                <Box sx={{ gridColumn: '5/6', gridRow: '1/5' }} />
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ gridColumn: '5/6', gridRow: '5/6' }}
                >
                  Save
                </Button>
              </Box>
            </form>
          </FormProvider>
        </Collapse>
      </TableCell>
    </TableRow>
  );
};

export default EnhancedTableRow;

EnhancedTableRow.propTypes = {
  colSpan: PropTypes.number.isRequired,
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    fields: PropTypes.array.isRequired
  }).isRequired,
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired
};
