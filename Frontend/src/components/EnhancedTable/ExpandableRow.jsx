import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Controller, useForm, FormProvider, useFormContext } from 'react-hook-form';
import { blue } from '@mui/material/colors';
import { DatePicker } from '@mui/lab';
import { DateTime } from 'luxon';
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

const Field = ({ id, label, type, value, possibleValues }) => {
  const { control, setValue } = useFormContext();

  switch (type) {
    case 'disabled': {
      return DateTime.fromFormat(value, 'MM/dd/yyyy').isValid ? (
        <DatePicker
          label={label}
          value={value}
          inputFormat="MM/dd/yyyy"
          renderInput={(params) => <TextField size="small" {...params} />}
          onChange={() => null}
          disabled
        />
      ) : (
        <TextField disabled size="small" id={id} label={label} value={value} />
      );
    }
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
            <DatePicker
              label={label}
              inputFormat="MM/dd/yyyy"
              renderInput={(params) => <TextField size="small" {...params} />}
              {...field}
              onChange={(date) => {
                setValue(id, date?.toFormat('MM/dd/yyyy'));
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
  value: PropTypes.string.isRequired,
  possibleValues: PropTypes.array
};

Field.defaultProps = {
  possibleValues: null
};

const ExpandableRow = ({ colSpan, data, open }) => {
  const formMethods = useForm();
  const { handleSubmit, setValue } = formMethods;

  useEffect(() => {
    setValue('id', data.id);
  }, []);

  return (
    <TableRow>
      <TableCell sx={{ padding: 0 }} colSpan={colSpan}>
        <Collapse in={open} timeout="auto" unmountOnExit>
          <FormProvider {...formMethods}>
            <form onSubmit={handleSubmit(data.submitHandler)}>
              <Box
                sx={{
                  backgroundColor: blue[50],
                  display: 'grid',
                  gridTemplate: 'repeat(5, 1fr) / repeat(4, 1fr) 6rem',
                  gap: '1rem 4rem',
                  padding: '2rem 6rem'
                }}
              >
                {data.fields.map(({ id, label, type, value, possibleValues }) => (
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

export default ExpandableRow;

ExpandableRow.propTypes = {
  colSpan: PropTypes.number.isRequired,
  data: PropTypes.shape({
    id: PropTypes.string.isRequired,
    fields: PropTypes.array.isRequired,
    submitHandler: PropTypes.func.isRequired
  }).isRequired,
  open: PropTypes.bool
};

ExpandableRow.defaultProps = {
  open: false
};
