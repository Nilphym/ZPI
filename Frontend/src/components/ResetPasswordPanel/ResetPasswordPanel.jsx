import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { styled } from '@mui/system';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import { useDispatch } from 'react-redux';

import logo from '../../assets/logo/logo2.png';
// import { ResetPassword } from '../../redux/store';

const Logo = styled('img')({
  width: '12.5rem',
  height: '8vh',
  position: 'absolute',
  top: '50%',
  left: '2%',
  transform: 'translateY(-50%)'
});

const formFields = {
  email: 'email',
  password: 'password',
  repeatPassword: 'repeatPassword'
};

const defaultValues = {
  [formFields.email]: '',
  [formFields.password]: '',
  [formFields.repeatPassword]: ''
};

const schema = yup.object().shape({
  [formFields.email]: yup.string().email().required(),
  [formFields.password]: yup.string().required().min(6),
  [formFields.repeatPassword]: yup.string().oneOf([yup.ref('password'), null])
});

export const ResetPasswordPanel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  async function onSubmit({ projectName, name, surname, email, password }) {
    // await dispatch(ResetPassword({ projectName, name, surname, email, password }));
    navigate('/');
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
          left: '49%',
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
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography align="center" variant="h2" gutterBottom component="div">
          Reset Password
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
          <Controller
            name="password"
            control={control}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="password"
                label="New Password"
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
                label="Repeat New Password"
                type="password"
                error={!!errors.repeatPassword || !!errors.password}
                helperText={
                  !!errors.repeatPassword || (!!errors.password && 'Passwords must be the same!')
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
            Reset
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default ResetPasswordPanel;
