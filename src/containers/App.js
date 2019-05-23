import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import history from '../history';
import { Router } from 'react-router';
import Login from '../components/Login';
import Dashboard from '../components/Dashboard';
import About from '../components/About';
import Profile from '../profile/Profile'
import UpdateProfile from '../profile/UpdateProfile';
import ProduceItem from '../dashboard/ProduceItem';

import withAuthentication from '../containers/withAuthentication';

import './App.css';

import {MuiThemeProvider, createMuiTheme} from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/red';
import indigo from '@material-ui/core/colors/indigo';
import pink from '@material-ui/core/colors/pink';
import red from '@material-ui/core/colors/red';
import AddSnowball from "../add-snowball/AddSnowball";
import lightGreen from "@material-ui/core/es/colors/lightGreen";

// All the following keys are optional.
// We try our best to provide a great default value.
const theme = createMuiTheme({
  palette: {
    primary: lightGreen,
    secondary: pink,
    error: red,
    // Used by `getContrastText()` to maximize the contrast between the background and
    // the text.
    contrastThreshold: 3,
    // Used to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

class App extends Component {
  render() {
    return (

      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact component={Login}/>
            <Route path='/connect-stripe' exact component={() => {
              window.location = `${process.env.REACT_APP_STRIPE_AUTH_URL}?response_type=code&client_id=${process.env.REACT_APP_STRIPE_CLIENT_ID}&scope=read_write&redirect_uri=${process.env.REACT_APP_STRIPE_REDIRECT_URI}`;
              return null;
            }}/>
            <Route path={'/update-profile'} component={withAuthentication(UpdateProfile)}/>
            <Route path={'/add-snowball'} component={withAuthentication(AddSnowball)}/>

            <Route path="/dashboard" component={withAuthentication(Dashboard)}/>
            <Route path="/produce-item" component={withAuthentication(ProduceItem)}/>
            <Route path="/profile" component={withAuthentication(Profile)}/>
            <Route path="/about" component={About}/>
          </Switch>
        </Router>
      </MuiThemeProvider>

    );
  }
}

export default App;
