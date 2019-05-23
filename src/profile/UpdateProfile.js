import React from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import ProfileForm from "./profile-form";
import {LocationMap} from "../location-map";


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import DeleteIcon from '@material-ui/icons/Delete';

import ArrowBack from '@material-ui/icons/ArrowBack';

import history from '../history';
import {auth} from "../firebase";
import firebase from '../firebase/firebase';
import {Collections as Constants} from '../constants/Collections';


import {UploadImage} from "../image-upload";
import {AddressModal} from "./address-modal";

const styles = theme => ({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  title: {
    flexGrow: 1,
  },
});


export class UpdateProfile extends React.Component {
  state = {
    addresses: ['1215 E Hyde Park blvd apt 509 Chicago IL 60615'],
    loading: true,
    user: null,
    description: '',
    newLocations: [],
    locations: [],
    tags: '',
    categories: '',
    active: null,
    photoUrl: '',
    updated: false,
    showModal: false

  };

  removeAddress = (idx, e) => {
    this.setState((prevState) => {
      const newAddrs = prevState.newLocations;
      newAddrs.splice(idx, 1);
      return {addresses: [...newAddrs]}
    })
  };


  saveChanges = () => {
    const {newLocations, description, tags, categories, photoUrl} = this.state;
    const locations = newLocations.reduce((acc, cur, idx) => {
      acc[String(idx)] = cur;
      return acc;
    }, {});

    firebase.firestore().collection(Constants.PLACES).doc(this.state.user.uid).set(
      {
        locations: locations,
        description: description.replace(/^\s+|\s+$/g, '') || {},
        tags: tags || [],
        categories: categories || {},
        photoUrl: photoUrl || ''
      }, {merge: true}).then(d => history.push('/profile'));
  };

  async componentDidMount() {
    const user = await auth.getAuth().currentUser;

    const profile = await firebase.firestore().collection(Constants.PLACES).doc(user.uid).get();
    const locations = profile.data().locations || {};
    const newLocations = [];
    Object.keys(locations).forEach((val, idx) => {
      newLocations.push(profile.data().locations[val]);
    }, []);

    this.setState({
      user: user,
      loading: false,
      name: profile.data().name,
      description: profile.data().description,
      newLocations: newLocations,
      locations: locations,
      tags: profile.data().tags,
      categories: profile.data().categories,
      active: profile.data().active,
      photoUrl: profile.data().photoUrl
    });
  }

  addLocation = (location) => {
    this.setState((prevState) => {
      const newLocations = [...prevState.newLocations, location];
      return {newLocations: newLocations};
    })
  };

  renderAddressList = () => {
    const {classes} = this.props;
    return (
      <Grid item>
        <Typography variant="h6" className={classes.title}>
          Location
        </Typography>
        <div className={classes.demo}>
          <List>
            {
              this.state.newLocations.map((val, idx) => {
                return (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={val.address}
                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={
                        this.removeAddress.bind(val, idx)}>
                        <DeleteIcon/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })
            }

          </List>
        </div>
        <AddressModal addLocation={this.addLocation}>Add new Location</AddressModal>

      </Grid>
    )
  };

  updateName = (name) => {
    this.setState({name});
  };
  updateDescription = (description) => {
    this.setState({description});
  };
  updatePhotoUrl = (photoUrl) => {
    this.setState({photoUrl});
  };

  render() {
    const {classes} = this.props;
    const {newLocations} = this.state;
    if (!this.state.loading) {
      return (
        <React.Fragment>
          <CssBaseline/>
          <AppBar position="absolute" color="default" className={classes.appBar}>
            <Toolbar>
              <IconButton onClick={() => history.push('profile')}>
                <ArrowBack/>
              </IconButton>
              <Typography
                component="h1"
                variant="h6"
                color="inherit"
                noWrap
                className={classes.title}
              >
                Update Profile
              </Typography>
            </Toolbar>
          </AppBar>


          <main className={classes.layout}>
            <Paper className={classes.paper}>

              <React.Fragment>
                <React.Fragment>
                </React.Fragment>
                <React.Fragment>

                  <ProfileForm name={this.state.name} description={this.state.description}
                               updateName={this.updateName}
                               updateDescription={this.updateDescription}/>


                  <UploadImage photoUrl={this.state.photoUrl} updatePhotoUrl={this.updatePhotoUrl}/>
                </React.Fragment>
              </React.Fragment>
              {this.renderAddressList()}
              <div className={classes.buttons}>
                <Button onClick={() => this.saveChanges()} className={classes.button}>
                  Save Changes
                </Button>
              </div>
            </Paper>
            <LocationMap center={newLocations.length === 0 ? {lat: 41.8781, lng: -87.6298} : this.state.newLocations[this.state.newLocations.length - 1]} locations={this.state.newLocations}/>

          </main>
        </React.Fragment>
      );
    }
    else {
      return <div></div>
    }
  }
}

UpdateProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UpdateProfile);
