import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import {firebase} from '../firebase';
import {signInEmailPassword} from "../firebase/auth";

const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',

    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


class SignIn extends React.Component {

  state = {
    email: '',
    password: '',
    error: ''
  };

  handleEmailChange = (e) => {
    this.setState({email: e.target.value, error: ''});
  };
  handlePasswordChange = (e) => {
    this.setState({password: e.target.value, error: ''});
  };

  handleSignIn = (event) => {
    event.preventDefault();
    if (this.state.email === '' || this.state.password === '') {
      this.setState({error: 'Must suppply email and password to sign up.'})
    }

    firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      this.setState({error: errorMessage})
    });
  };

  handleSignUp = (event) => {
    if (this.state.email === '' || this.state.password === '') {
      this.setState({error: 'Must suppply email and password to sign up.'})
    }
    firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(this.state.email, this.state.password).then()
      .catch(err => {
        this.setState({error: err.message})
      })
    event.preventDefault();
  };


  render() {
    const {classes} = this.props;
    return (

      <main className={classes.main}>
        <CssBaseline/>
        <Paper className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon/>
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} onSubmit={this.handleSignIn} id={'login'}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" value={this.state.email}
                     onChange={this.handleEmailChange} autoFocus/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" value={this.state.password}
                     onChange={this.handlePasswordChange} autoComplete="current-password"/>
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary"/>}
              label="Remember me"
            />
            {this.state.error !== '' && <p style={{color: 'red', justifyContent:'center', alignContent:'center', alignItems:"center"}}>{this.state.error}</p>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              form={'login'}
              id={'loginButton'}
            >
              Sign in
            </Button>

          </form>
          <Button
            onClick={this.handleSignUp}
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            id={'signup'}
          >
            Sign Up
          </Button>
        </Paper>
      </main>
    )
      ;
  }
}

SignIn.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(SignIn);
