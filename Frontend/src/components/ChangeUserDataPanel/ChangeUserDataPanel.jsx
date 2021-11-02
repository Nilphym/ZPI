import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import React from 'react';
import { useDispatch } from 'react-redux';
import { changeUserName, changeUserSurname, changeUserPasswordById } from '../../redux/store';


const schemaName = yup.object().shape({
  name: yup.string().isRequired()
});

const schemaSurname = yup.object().shape({
  surname: yup.string().isRequired()
});

const schemaPassword = yup.object().shape({
  password: yup.string().isRequired().min(6),
  repeatPassword: yup.string().oneOf([yup.ref('password'), null])
});

export const ChangeUserDataPanel = () => {
  const dispatch = useDispatch();

  const {
    control: controlName,
    handleSubmit: handleSubmitName,
    reset: resetName,
    formState: { errors: errorsName }
  } = useForm({
    resolver: yupResolver(schemaName)
  });

  const {
    control: controlSurname,
    handleSubmit: handleSubmitSurname,
    reset: resetSurname,
    formState: { errors: errorsSurname }
  } = useForm({
    resolver: yupResolver(schemaSurname)
  });

  const {
    control: controlPassword,
    handleSubmit: handleSubmitPassword,
    reset: resetPassword,
    formState: { errors: errorsPassword }
  } = useForm({
    resolver: yupResolver(schemaPassword)
  });

  async function onSubmitName({ name }) {
    await dispatch(changeUserName({ name }));
    resetName({ name: '' }, {
      keepIsValid: true
    });

  };
  async function onSubmitSurname({ surname }) {
    await dispatch(changeUserSurname({ surname }));
    resetSurname({ surname: '' }, {
      keepIsValid: true
    });

  };
  async function onSubmitPassword({ password }) {
    await dispatch(changeUserPasswordById({ password }));
    resetPassword({ password: '', repeatPassword: '' }, {
      keepIsValid: true
    });
  };

  return (
    <Box>
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
          Change User Data
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmitName(onSubmitName)}
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Controller
            name="name"
            control={controlName}
            rules={{ required: true }}
            render={({ field }) => (
              <TextField
                id="name"
                label="Name"
                type="text"
                error={!!errorsName.name}
                helperText={!!errorsName.name && 'Name field cannot be empty!'}
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
            Change Data
          </Button>
        </Box>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmitSurname(onSubmitSurname)}
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Controller
          name="surname"
          control={controlSurname}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="surname"
              label="Surname"
              type="text"
              error={!!errorsSurname.surname}
              helperText={!!errorsSurname.surname && 'Surname field cannot be empty!'}
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
          Change Data
        </Button>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmitPassword(onSubmitPassword)}
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Controller
          name="password"
          control={controlPassword}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="password"
              label="New Password"
              type="password"
              error={!!errorsPassword.password}
              helperText={
                !!errorsPassword.password &&
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
          control={controlPassword}
          rules={{ required: true }}
          render={({ field }) => (
            <TextField
              id="repeatPassword"
              label="Repeat New Password"
              type="password"
              error={!!errorsPassword.repeatPassword || !!errorsPassword.password}
              helperText={
                !!errorsPassword.repeatPassword || (!!errorsPassword.password && 'Passwords must be the same!')
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
          Change Data
        </Button>
      </Box>
    </Box>

  );
};

export default ChangeUserDataPanel;
