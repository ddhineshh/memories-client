import React, { useState } from 'react'
import { Avatar, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';

import useStyles from './styles'
import Input from './Input';
import Icon from './icon';
import { useHistory } from 'react-router-dom';
import { signin, signup } from '../../actions/auth.js'

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '', };

const Auth = () => {

  const [formData, setFormData] = useState(initialState);

  const history = useHistory();

  const dispatch = useDispatch();

  const classes = useStyles();

  const [isSignup, setIsSignup] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => setShowPassword(prev => !prev);

  const handleSubmit = (e) => {

    e.preventDefault();

    if (isSignup) {
      dispatch(signup(formData, history));
    } else {
      dispatch(signin(formData, history));
    }


  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const switchMode = () => {
    setIsSignup(prev => !prev);
    setShowPassword(false);
  };

  const googleSuccess = async (response) => {
    const result = response?.profileObj;
    const token = response?.tokenId

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/');
    } catch (error) {
      console.log(error);
    }

  };
  const googleFailure = () => {
    console.log("Failed Try again...");
  };

  return (
    <Container component='main' maxWidth='xs'>
      <Paper className={classes.paper} elevation={3} >
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant='h5'>{isSignup ? 'Sign up' : 'Sign in'}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {
              isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} autoFocus half />
                  <Input name="lastName" label="Last Name" handleChange={handleChange} half />

                </>
              )}
            <Input name="email" label="Email" handleChange={handleChange} type="email" />
            <Input name="password" label="Password" handleChange={handleChange} type={showPassword ? 'text' : "password"} handleShowPassword={handleShowPassword} />
            {
              isSignup && (
                <Input name="confirmPassword" label="Repeat Password" handleChange={handleChange} type="password" />
              )
            }
          </Grid>
          <Button type="submit" fullWidth variant="contained" color="primary" className={classes.submit}>
            {
              isSignup ? 'Sign up' : 'Sign in'
            }
          </Button>
          <GoogleLogin
            clientId="189937876542-nkaouc2r5qjtk1h2rjan9qjcn4jili76.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant='contained'
                color="primary"
                fullWidth
              >
                Google Sign in
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cokkiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Button onClick={switchMode}>
                {
                  isSignup ? 'Already have an account? Sign in' : 'Don\'t have an account? Sign up'
                }
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default Auth