import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Geocode from "react-geocode";
import TextField from "@material-ui/core/es/TextField/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

// set Google Maps Geocoding API for purposes of quota management. Its optional but recommended.
Geocode.setApiKey(process.env.REACT_APP_GEOCODE_KEY);


const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  }, buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

class AddressModalInput extends React.Component {
  state = {
    open: false,
    label: "Address"
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };


  geocodeAddress = (address) => {
    return Geocode.fromAddress(address).then(
      response => {
        console.log(response);
        const {lat, lng} = response.results[0].geometry.location;
        this.setState({error: false, label: "Address"});
        return {lat, lng, address: address}
      })
      .catch(
        error => {
          console.error(error);
          this.setState({error: true, label: "The address entered was not found"});
          throw error;
        }
      );
  };

  addAddress = () => {
    const {address} = this.state;
    this.geocodeAddress(address).then((location) => {
      this.props.addLocation(location);
      this.setState({address:''});
      this.handleClose();
    })
      .catch((err) => err);

  };

  updateAddress = (val) => {
    this.setState({address: val})
  };

  render() {
    const {classes} = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add new Location
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add a new location please type the address here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={this.state.label}
              type="address"
              onChange={(e) => this.updateAddress(e.target.value)}
              value={this.state.address}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addAddress} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

// AddressModal.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// We need an intermediary variable for handling the recursive nesting.
export const AddressModal = withStyles(styles)(AddressModalInput);
