import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
// import PropTypes from 'prop-types';
import axios from 'axios';
import React from 'react';

const formFields = {
  email: 'email'
};

const defaultValues = {
  [formFields.email]: ''
};

const schema = yup.object().shape({
  [formFields.email]: yup.string().email().required()
});

const InviteUserToProjectPanel = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    try {
      axios({
        method: 'POST',
        url: '/api/project/invite-user',
        data
      });
    } catch (err) {
      console.error(err.status);
    }
    console.log(data);
    reset(defaultValues, {
      keepIsValid: true
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        position: 'absolute',
        top: '23%',
        left: '50%',
        width: '21.875rem',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Typography align="center" variant="h2" gutterBottom component="div">
        Add user to the project
      </Typography>
      <Controller
        name="email"
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <TextField
            id="email"
            label="Email"
            type="email"
            error={!!errors.email}
            helperText={!!errors.email && 'Email field cannot be empty and must be in pattern!'}
            {...field}
            sx={{
              marginTop: '0.625rem'
            }}
          />
        )}
      />
      <Button
        type="submit"
        variant="contained"
        sx={{
          height: '3.125rem',
          marginTop: '0.625rem'
        }}
      >
        Invite
      </Button>
    </Box>
  );
};

export default InviteUserToProjectPanel;
