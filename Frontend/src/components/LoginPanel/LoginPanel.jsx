import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { styled } from '@mui/system';
import { Link } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

// import PropTypes from 'prop-types';
import axios from 'axios';
import React from 'react';
import logo from '../../assets/logo/logo2.png';

const Logo = styled('img')({
  width: '12.5rem',
  height: '8vh',
  position: 'absolute',
  top: '50%',
  left: '2%',
  transform: 'translateY(-50%)'
});

const formFields = {
  login: 'login',
  password: 'password'
};

const defaultValues = {
  [formFields.login]: '',
  [formFields.password]: ''
};

const schema = yup.object().shape({
  [formFields.login]: yup.string().required(),
  [formFields.password]: yup.string().required().min(6)
});

const LoginPanel = () => {
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
        url: '/api/auth/login',
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

  const StyledLink = styled(Link)({
    color: 'blue',
    '&:visited': {
      color: 'blue'
    },
    '&:focus, &:hover, &:active': {
      color: 'grey'
    }
  });
  // 1rem <=> 16px
  return (
    <Box>
      <Box
        sx={{
          width: '12.5rem',
          height: '8vh',
          position: 'absolute',
          top: '20%',
          left: '49%',
          transform: 'translateX(-50%)'
        }}
      >
        <Logo src={logo} alt="logo" />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: '33%',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Typography align="center" variant="h2" gutterBottom component="div">
          Login Panel
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
            name={formFields.login}
            control={control}
            render={({ field }) => (
              <TextField
                id={formFields.login}
                label="Login"
                type="text"
                error={!!errors.login}
                helperText={!!errors.login && 'Login field cannot be empty!'}
                {...field}
                sx={{
                  marginTop: '0.625rem'
                }}
              />
            )}
          />
          <Controller
            name={formFields.password}
            control={control}
            render={({ field }) => (
              <TextField
                id={formFields.password}
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={
                  !!errors.password &&
                  'Password field cannot be empty and must contain min. 6 letters!'
                }
                {...field}
                sx={{
                  margin: '0.625rem 0 0.625rem 0'
                }}
              />
            )}
          />
          <StyledLink to="/register">Register a new product -&gt;</StyledLink>
          <Button
            type="submit"
            variant="contained"
            sx={{
              height: '3.125rem',
              marginTop: '0.625rem',
              marginBottom: '1.25rem'
            }}
          >
            Login
          </Button>
          <Box>
            <Typography>{`Have you forgot you password? ${' '}`}</Typography>
            <StyledLink to="#!">Reset password</StyledLink>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginPanel;
