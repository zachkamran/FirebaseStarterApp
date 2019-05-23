import React, {Component} from 'react';
import {auth} from "../firebase";
import {Collections as Constants} from "../constants/Collections";

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


export default class ProfileForm extends Component {
  state = {
    descriptionError: false,
    nameError: false
  };
  updateName = (val) => {
    if (val.length > 50) {
      this.setState({nameError: true})
    }
    else {
      this.props.updateName(val);
      this.setState({nameError: false})
    }
  };

  updateDescription = (val) => {
    if (val.length > 200) {
      this.setState({descriptionError: true})
    }
    else {
      this.props.updateDescription(val);
      this.setState({descriptionError: false})
    }
  };

  render() {
    return (
      <div>
        <React.Fragment>
          <Typography variant="h6" gutterBottom>
            Business Details
          </Typography>
          <Grid container spacing={24}>
            <Grid item xs={12}>
              <TextField
                required
                id="businessName"
                name="businessName"
                label={"Business Name (max length 100 characters)"}
                value={this.props.name || ''}
                onChange={(event) => {
                  this.updateName(event.target.value)
                }}
                error={this.state.nameError}
                fullWidth
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="description"
                name="description"
                onChange={(event) => {
                  this.updateDescription(event.target.value)
                }}
                value={this.props.description || ''}
                label="Description (max length 200 characters)"
                fullWidth
                multiline
                error={this.state.descriptionError}

              />
            </Grid>
          </Grid>
        </React.Fragment>
      </div>
    );
  }
}
