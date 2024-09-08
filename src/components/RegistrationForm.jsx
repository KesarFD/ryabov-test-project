import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { Box, TextField, Button, Checkbox, FormControlLabel, Typography, InputAdornment, IconButton, Link } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema } from '../utils/validationSchemas';

const RegistrationForm = ({ onToggle }) => {
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange',
  });

  const [showPassword, setShowPassword] = useState(false); 
  const password = watch('password') || '';

  const generatePassword = () => {
    const length = 12;
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!#$%^&*()_+~';

    let password = '';
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += symbols[Math.floor(Math.random() * symbols.length)];

    const allCharacters = lowercase + uppercase + numbers + symbols;
    for (let i = password.length; i < length; i++) {
      password += allCharacters[Math.floor(Math.random() * allCharacters.length)];
    }

    password = password
      .split('')
      .sort(() => 0.5 - Math.random())
      .join('');

    setValue('password', password);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const onSubmit = (data) => {
    console.log(data);
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
              sx={{ mb: 2, color: '#A6ABB0'}}
            />
          )}
        />
        <Controller
          name="phone"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Phone number"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.phone}
              helperText={errors.phone ? errors.phone.message : ''}
              sx={{ mb: 2, color: '#A6ABB0'}}
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
              type={showPassword ? 'text' : 'password'}
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.password}
              helperText={errors.password ? errors.password.message : ''}
              sx={{ mb: 2, color: '#A6ABB0'}}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {password.length === 0 ? (
                      <Button sx={{borderRadius: "10px", color: "black", border: "1px solid #A6ABB0", textTransform: 'none'}} onClick={generatePassword} edge="end">
                        Generate
                      </Button>
                    ) : (
                      <IconButton sx={{color: "#A6ABB0"}} onClick={togglePasswordVisibility} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    )}
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Box sx={{ mt: 2, mb: 2 }}>
          <ValidationItem
            condition={!password.includes('@')}
            text="Can't contain an e-mail address"
          />
          <ValidationItem
            condition={password.length >= 8}
            text="At least 8 characters"
          />
          <ValidationItem
            condition={/\d/.test(password) && /[A-Za-z]/.test(password)}
            text="Contains a number (and) symbol"
          />
          <ValidationItem
            condition={/[A-Z]/.test(password)}
            text="One or more capitalized letter"
          />
        </Box>
        <Controller
          name="referralCode"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <TextField
              {...field}
              label="Referral code"
              variant="outlined"
              margin="normal"
              fullWidth
              error={!!errors.referralCode}
              helperText={errors.referralCode ? errors.referralCode.message : ''}
              sx={{ mb: 2, color: '#A6ABB0'}}
            />
          )}
        />
        <FormControlLabel
          control={
            <Controller
              name="acceptTerms"
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <Checkbox {...field} color="primary" />
              )}
            />
          }
          label={
            <span>
              I accept the{' '}
              <Link href="/terms" color="#526ED3">
                Terms of Use
              </Link>{' '}
              and have read the{' '}
              <Link href="/privacy" color="#526ED3">
                Privacy Policy
              </Link>
            </span>
          }
          sx={{ mb: 2, color: '#A6ABB0' }}
        />
        {errors.acceptTerms && (
          <Typography color="error" sx={{ mb: 2 }}>You must accept the terms and conditions</Typography>
        )}
        <Button 
          type="submit" 
          variant="contained" 
          color="primary" 
          fullWidth 
          sx={{height: '48px', textTransform: 'none', fontSize: '16px'}}
          disabled={!isValid}
        >
          Sign Up
        </Button>
      </form>
    </Box>
  );
};

const ValidationItem = ({ condition, text }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
    {condition ? (
      <CheckIcon sx={{ color: 'green', mr: 1 }} />
    ) : (
      <CloseIcon sx={{ color: 'red', mr: 1 }} />
    )}
    <Typography color={condition ? 'green' : 'red'}>{text}</Typography>
  </Box>
);

export default RegistrationForm;