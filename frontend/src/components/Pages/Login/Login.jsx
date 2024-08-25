import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles'; 
import axios from 'axios'
import "./Login.css"
function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        BookKeeper
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn() {
  const [isSignUp, setIsSignUp] = React.useState(false);
  const [isForgotPassword, setIsForgotPassword] = React.useState(false);
  const navigate = useNavigate(); // Initialize useNavigate
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

  
    try {
      const baseUrl = 'http://localhost:5000'; // Your backend URL
  
      if (isSignUp) {
        await axios.post(`${baseUrl}/api/signup`, {
          name: data.get('name'),
          email: data.get('email'),
          password: data.get('password'),
        });
        alert('Sign up successful');
        navigate('/login'); // Redirect to login page after sign up
      } else if (isForgotPassword) {
        await axios.post(`${baseUrl}/api/forgot-password`, {
          email: data.get('email'),
          newPassword: data.get('password'),
        });
        alert('Password reset successful');
        navigate('/login'); // Redirect to login page after password reset
      } else {
        const response = await axios.post(`${baseUrl}/api/signin`, {
          email: data.get('email'),
          password: data.get('password'),
        });
        alert('Sign in successful');
        localStorage.setItem('token', response.data.token); 
        localStorage.setItem('UserId', response.data.UserId); 
        navigate('/dashboard/home'); 
      }
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      alert('Operation failed');
    }
  };

  const toggleSignUp = () => {
    setIsSignUp(!isSignUp);
    setIsForgotPassword(false);
  };

  const toggleForgotPassword = () => {
    setIsForgotPassword(!isForgotPassword);
    setIsSignUp(false);
  };

  return (
    <div className='login-container backgroundContainer'>
    <ThemeProvider theme={defaultTheme}>
   
      <Container component="main" maxWidth="xs" className='login-box'>
        <CssBaseline />
        <Box 
          sx={{
            padding: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon /> 
          </Avatar>
          <h3 style={{marginBottom: '10px'}}>Book Keeper</h3>

          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            {isSignUp && !isForgotPassword && (
              <TextField
                margin="normal"
                required
                fullWidth
                id="name"
                label="Name"
                name="name"
                autoComplete="name"
                autoFocus
              />
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus={!isSignUp}
            />
            {!isForgotPassword && (
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            )}
            {!isForgotPassword && (
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
            >
              {isForgotPassword ? 'Reset Password' : isSignUp ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container>
              {!isForgotPassword && (
                <Grid item xs>
                  <Link href="#" variant="body2" onClick={toggleForgotPassword}>
                    Forgot password?
                  </Link>
                </Grid>
              )}
              <Grid item>
                <Link href="#" variant="body2" onClick={toggleSignUp}>
                  {isSignUp || isForgotPassword ? 'Sign In' : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 2, mb: 2 }} />
      </Container>
    </ThemeProvider>
    </div>
  );
}