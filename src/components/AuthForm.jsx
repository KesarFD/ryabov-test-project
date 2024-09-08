import React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button } from '@mui/material';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../utils/validationSchemas';

const AuthForm = ({ onToggle }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data) => {
    console.log(data);
    // Логика отправки данных на сервер
  };

  return (
    <Box sx={{ width: '100%' }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="email"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="E-mail"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.email}
              helperText={errors.email ? errors.email.message : ''}
              sx={{ mb: 2, fontFamily: 'Inter',}}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              sx={{ mb: 2 }}
            />
          )}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{height: '48px', textTransform: 'none', fontSize: '16px'}}>
          Sign In
        </Button>
      </form>
    </Box>
  );
};

export default AuthForm;