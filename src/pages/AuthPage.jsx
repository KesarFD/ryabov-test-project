import React, { useState } from 'react';
import { Box, Paper, ToggleButton, ToggleButtonGroup, Link } from '@mui/material';
import RegistrationForm from '../components/RegistrationForm';
import AuthForm from '../components/AuthForm';
import banner from '../assets/Banner.png';
import logo from '../assets/Logo.png';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(false);

  const handleToggle = (event, newValue) => {
    if (newValue !== null) {
      setIsLogin(newValue === 'login');
    }
  };

  const styles = {
    logo: { width: '238px', height: '44px' },
    formContainer: {
      padding: window.innerWidth < 800 ? '16px' : '40px',
      boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
      borderRadius: '16px',
    },
    toggleButtons: {
      mb: 3,
      padding: '4px',
      maxWidth: '472px',
      display: 'flex',
      justifyContent: 'center',
      bgcolor: '#F4F4F4',
      borderRadius: '16px',
      gap: '8px',
    },
    toggleButton: {
      flex: 1,
      borderRadius: '16px',
      textTransform: 'none',
      fontSize: '16px',
      fontWeight: '500',
      color: '#A6ABB0',
      height: '40px',
      '&.Mui-selected': {
        bgcolor: '#FFFFFF',
        color: '#000',
      },
    },
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f4f4f4' }}>
      <Box
        sx={{
          flex: 1,
          width: '516px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          bgcolor: '#F4F4F4',
        }}
      >
        <Box sx={{ width: '84%', height: '92px', paddingLeft: '16%', paddingTop: '24px', marginBottom: '64px' }}>
          <Box component="img" src={logo} alt="Logo" sx={styles.logo} />
        </Box>

        <Box sx={{ display: 'flex', width: '90%', maxWidth: '560px', minWidth: '360px', alignItems: 'center' }}>
          <Paper elevation={3} sx={styles.formContainer}>
            <ToggleButtonGroup
              value={isLogin ? 'login' : 'signup'}
              exclusive
              onChange={handleToggle}
              sx={styles.toggleButtons}
            >
              <ToggleButton value="signup" sx={styles.toggleButton}>
                Sign up
              </ToggleButton>
              <ToggleButton value="login" sx={styles.toggleButton}>
                Login
              </ToggleButton>
            </ToggleButtonGroup>
            {isLogin ? <AuthForm onToggle={handleToggle} /> : <RegistrationForm onToggle={handleToggle} />}
          </Paper>
        </Box>

        <Footer />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          background: `url(${banner}) center/cover no-repeat`,
          color: '#fff',
          flexDirection: 'column',
          gap: '24px',
          paddingLeft: '64px',
          paddingTop: '166px',
        }}
      >
        <h1 style={{ margin: 0, fontSize: '40px', fontWeight: '700' }}>Start Investing in global stock markets</h1>
        <p style={{ margin: 0, fontSize: '16px', fontWeight: '400' }}>
          Mind.money.eu is the easiest place to invest your money and become a rich guy.<br />
          Sign up and get started today with a 14-day free trial!
        </p>
      </Box>
    </Box>
  );
};

const Footer = () => (
  <Box sx={{ display: 'flex', gap: '50px', padding: '10px', marginTop: '104px', marginBottom: '64px' }}>
    <p style={{ margin: 0, fontSize: '14px', color: '#A6ABB0' }}>© 2024 MIND MONEY LIMITED</p>
    <p style={{ margin: 0, fontSize: '14px', color: '#A6ABB0' }}>
      Have some issue? Write us at{' '}
      <Link href="mailto:info@mind-money.eu" color="#526ED3">
        info@mind-money.eu
      </Link>
    </p>
  </Box>
);

export default AuthPage;