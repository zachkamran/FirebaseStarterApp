import React, {Component} from 'react';


import './Dashboard.css';
import DashboardHome from '../dashboard/Dashboard';

class Dashboard extends Component {
  static propTypes = {};

  // static defaultProps = {
  //   providerData: []
  // };

  render() {
    return (

      <DashboardHome/>

    );
  }
}

export default Dashboard;
