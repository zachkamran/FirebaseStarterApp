import React from 'react';
import PropTypes from 'prop-types';

import './Layout.css';
import {Link} from "react-router-dom";
import Colors from '../constants/Colors';

const propTypes = {
  children: PropTypes.node.isRequired,
  contentCenter: PropTypes.bool
};

const defaultProps = {
  contentCenter: false
};

const Layout = ({ children, contentCenter }) => {
  return (
    <section style={{backgroundColor:Colors.snowballBlue}}>
      <header>
      </header>
      <main className={contentCenter ? 'content-center' : ''} >{children}</main>
      <footer style={{backgroundColor:Colors.snowballBlue}}>
        <div style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
          contact us: team@algocado.com
        </div>
        <div><Link to="/terms-and-conditions">Terms and Conditions</Link></div>

      </footer>
    </section>
  );
};

Layout.propTypes = propTypes;
Layout.defaultProps = defaultProps;

export default Layout;
