import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/es/TextField/TextField";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';



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

class ItemModalInput extends React.Component {
  state = {
    open: false,
    name: '',
    description:''
  };

  handleClickOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  addItem = () => {
    const item = {
      name:this.state.name,
      description:this.state.description
    };
    this.props.addItem(item);
    this.setState({name:'', description:''});
    this.handleClose();
  };


  render() {
    const {classes} = this.props;
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
          Add Item
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To add an Item fill out the details here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={'Item Name'}
              type="address"
              onChange={this.handleChange('name')}
              value={this.state.name}
              fullWidth
            />

            <TextField
              autoFocus
              margin="dense"
              id="name"
              label={'Item Description'}
              type="address"
              onChange={this.handleChange('description')}
              value={this.state.description}
              fullWidth
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.addItem} color="primary">
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
export const ItemModal = withStyles(styles)(ItemModalInput);
