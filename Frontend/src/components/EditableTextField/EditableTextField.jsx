import React, { useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { editTestCaseTextField } from '../../redux/reducers/test/testSlice';

const EditableTextField = ({ disabled, deleteTextField, data }) => {
  const { control: textFieldControl, getValues } = useForm();

  const [isEditing, setIsEditing] = useState(false);

  const dispatch = useDispatch();

  const saveTextField = () => {
    setIsEditing(false);
    const textFieldObject = {
      textFieldId: data.textFieldId,
      entryType: 'textField',
      textField: getValues(`textField-${data.textFieldId}`)
    };
    dispatch(editTestCaseTextField({ editedTextField : textFieldObject}));
  };

  return (
    <Box
      sx={{
        marginTop: '1.25rem'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          marginTop: '0.625rem'
        }}
      >
        {!disabled && (
          <DeleteIcon
            sx={{
              position: 'absolute',
              top: '-2.5vh',
              right: '1vw',
              border: '1px solid black',
              borderRadius: '50%',
              padding: '2px',
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={() => deleteTextField()}
          />
        )}
        {!disabled && !isEditing && (
          <CreateIcon
            sx={{
              position: 'absolute',
              top: '-2.5vh',
              right: '5vw',
              border: '1px solid black',
              borderRadius: '50%',
              padding: '2px',
              '&:hover': {
                cursor: 'pointer'
              }
            }}
            onClick={() => setIsEditing(true)}
          />
        )}
        <Box
          sx={{
            width: '100%'
          }}
        >
          <Box
            sx={{
              width: '100%'
            }}
          >
            <Controller
              shouldUnregister
              name={`textField-${data.textFieldId}`}
              control={textFieldControl}
              defaultValue={data.textField}
              render={({ field }) => (
                <TextField
                  id={`textField-${data.textFieldId}`}
                  type="text"
                  multiline
                  rows={3}
                  disabled={!isEditing}
                  {...field}
                  sx={{
                    marginTop: '0.625rem',
                    width: '100%'
                  }}
                />
              )}
            />
          </Box>
        </Box>
      </Box>
      {isEditing && (
        <Button variant="outlined" sx={{ marginTop: '1.5rem' }} onClick={() => saveTextField()}>
          Save TextField
        </Button>
      )}
    </Box>
  );
};

EditableTextField.propTypes = {
  disabled: PropTypes.bool.isRequired,
  deleteTextField: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default EditableTextField;
