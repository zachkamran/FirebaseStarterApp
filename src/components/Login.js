import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import Layout from '../containers/Layout';

import { auth } from '../firebase';
import SignIn from '../login/signin';

class Login extends Component {
  /**
   * Send the user to 'Dashboard' if is authenticated
   */
  componentDidMount() {
    console.log(process.env);
    auth.getAuth().onAuthStateChanged(user => {

      if (user) {
        user.getIdTokenResult()
          .then((idTokenResult) => {
            // Confirm the user is an Admin.
            this.props.history.push('/profile');
          })
          .catch((error) => {
            console.log(error);
          });

      }

    });
  }


  render() {
    return (
      <Layout >
        <SignIn style={{display: 'flex', justifyContent: 'center'}}/>
      </Layout>
    );
  }
}

export default Login;

