/* eslint-disable no-console */
import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import PropTypes from 'prop-types';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// import PropTypes from 'prop-types';
import axios from 'axios';
import React from 'react';
import logo from '../../assets/logo/logo2.png';

const Logo = styled('img')({
  width: '200px',
  height: '8vh',
  position: 'absolute',
  top: '50%',
  left: '2%',
  transform: 'translateY(-50%)'
});

const formFields = {
  name: 'name',
  surname: 'surname',
  password: 'password',
  repeatPassword: 'repeatPassword'
};

const defaultValues = {
  [formFields.name]: '',
  [formFields.surname]: '',
  [formFields.password]: '',
  [formFields.repeatPassword]: ''
};

const schema = yup.object().shape({
  [formFields.name]: yup.string().required(),
  [formFields.surname]: yup.string().required(),
  [formFields.password]: yup.string().required().min(6),
  [formFields.repeatPassword]: yup.string().oneOf([yup.ref('password'), null])
});

export const RegisterToProjectPanel = ({ projectName }) => {
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
        url: '/api/auth/register-user',
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
    <Box>
      <Box
        sx={{
          width: '12.5rem',
          height: '8vh',
          position: 'absolute',
          top: '10%',
          left: '48%',
          transform: 'translateX(-50%)'
        }}
      >
        <Logo src={logo} alt="logo" />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '23%',
          left: '50%',
          width: '25rem',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexWrap: 'wrap',
          flexDirection: 'column'
        }}
      >
        <Typography align="center" variant="h3" gutterBottom component="div">
          {`Register User to ${projectName} Panel`}
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Controller
            name="name"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="name"
                label="Name"
                type="text"
                error={!!errors.name}
                helperText={!!errors.name && 'Name field cannot be empty!'}
                {...field}
                sx={{
                  marginTop: '0.625rem'
                }}
              />
            )}
          />
          <Controller
            name="surname"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="surname"
                label="Surname"
                type="text"
                error={!!errors.surname}
                helperText={!!errors.surname && 'Surname field cannot be empty!'}
                {...field}
                sx={{
                  marginTop: '0.625rem'
                }}
              />
            )}
          />
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="password"
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={
                  !!errors.password &&
                  'Password field cannot be empty and must contain min. 6 letters!'
                }
                {...field}
                sx={{
                  margin: '0.625rem 0 0 0'
                }}
              />
            )}
          />
          <Controller
            name="repeatPassword"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="repeatPassword"
                label="Repeat Password"
                type="password"
                error={!!errors.repeatPassword || !!errors.password}
                helperText={
                  (!!errors.repeatPassword || !!errors.password) && 'Passwords must be the same!'
                }
                {...field}
                sx={{
                  margin: '0.625rem 0 0.625rem 0'
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
            Register User
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

RegisterToProjectPanel.propTypes = {
  projectName: PropTypes.string.isRequired
};

export default RegisterToProjectPanel;
