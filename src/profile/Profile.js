/*
The profile page has

is a tab on main dashboard.
Uses cards one card for business photos. One card to add snowballs. One card to add/edit location.

 */

import React, {Component} from 'react';
import {auth} from "../firebase";

import {withStyles} from '@material-ui/core/styles';
import firebase from '../firebase/firebase'
import {Collections as Constants} from "../constants/Collections";
import queryString from 'query-string'
import ProfileGrid from './profile-grid';
import {isStripeConnected} from "../utils/data-utils";

import classNames from 'classnames';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import {MainListItems} from '../dashboard/listItems';

const drawerWidth = 240;

class Profile extends Component {

  state = {
    user: null,
    loading: true,
    open: false,
    isStripeConnected: false
  };


  handleDrawerOpen = () => {
    this.setState({open: true});
  };

  handleDrawerClose = () => {
    this.setState({open: false});
  };

  async componentDidMount() {
    const user = await auth.getAuth().currentUser;
    this.setState({user});
    console.log(user.uid);


    console.log(this.props.location.search);
    const params = this.props.location.search;

    if (params) {
      const value = queryString.parse(this.props.location.search);
      const token = value.code;

      if (token) {
        await firebase.firestore().collection(Constants.STRIPE_BUSINESS).doc(user.uid).set({'code': token})
      }
    }

    const profile = await firebase.firestore().collection(Constants.PLACES).doc(user.uid).get();

    const stripeConnected = await isStripeConnected(user.uid);
    this.setState({loading: false, profile: profile.data(), isStripeConnected: stripeConnected});
  }


  render() {
    console.log(process.env);
    const {classes} = this.props;

    if (!this.state.loading) {
      return (
        <div className={classes.root}>
          <CssBaseline/>
          <AppBar
            position="absolute"
            className={classNames(classes.appBar, this.state.open && classes.appBarShift)}
          >
            <Toolbar disableGutters={!this.state.open} className={classes.toolbar}>
              <IconButton
                color="inherit"
                aria-label="Open drawer"
                onClick={this.handleDrawerOpen}
                className={classNames(
                  classes.menuButton,
                  this.state.open && classes.menuButtonHidden,
                )}
              >
                <MenuIcon/>
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                {/*{this.state.profile.name}*/}
                {`ALGOCADO`}
              </Typography>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="permanent"
            classes={{
              paper: classNames(classes.drawerPaper, !this.state.open && classes.drawerPaperClose),
            }}
            open={this.state.open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={this.handleDrawerClose}>
                <ChevronLeftIcon/>
              </IconButton>
            </div>
            <Divider/>
            <MainListItems history={this.props.history}/>
            <Divider/>
          </Drawer>
          <main className={classes.content}>
            <div className={classes.appBarSpacer}/>
            <Typography variant="h4" gutterBottom component="h2">
              {/*{this.state.profile.name}*/}
              {`Hello Whole Foods Market!`}
            </Typography>
            <br />
            <Typography variant="h5" gutterBottom component="h2">
              {/*{this.state.profile.name}*/}
              {`Here are today's avocado prices: `}
            </Typography>
            <br />
            <Typography component="div" className={classes.chartContainer}>
              <ProfileGrid/>
            </Typography>

          </main>
        </div>
      )
    }
    else {
      return <div></div>
    }
  }

}

const styles = theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing.unit * 9,
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: '100vh',
    overflow: 'auto',
  },
  chartContainer: {
    marginLeft: -22,
  },
  tableContainer: {
    height: 320,
  },
  h5: {
    marginBottom: theme.spacing.unit * 2,
  },
});

export default withStyles(styles)(Profile);
