import React, {Component} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';


import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import {ItemModal} from "./ItemModal";
import {computeAveragePriceWithReward, formatMoney} from "./addSnowballUtils";
import {NumberFormatCustom} from "./numberFormat";
//
// return {
//   name: data.name,
//   original_price: data.original_price,
//   discount_price: data.discount_price,
//   discount_percentage: data.discount_percentage,
//   description: data.description,
//   threshold: data.threshold,
//   original_quantity: data.quantity,
//   current_quantity: data.quantity,
//   datetime_created: new Date(),
//   active: true,
//   items: data.items,
//   tags: placeTags
// }
//

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
  },
  menu: {
    width: 200,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
});


const thresholds = [
  {
    value: 5,
    label: 5,
  },
  {
    value: 10,
    label: 10,
  },
  {
    value: 15,
    label: 15,
  },
  {
    value: 20,
    label: 20,
  },
  {
    value: 25,
    label: 25,
  },
  {
    value: 30,
    label: 30,
  },
];


const discountPercents = [
  {
    label: '10%',
    value: 0.10,
  },
  {
    label: '15%',
    value: 0.15,
  },
  {
    label: '20%',
    value: 0.20,
  },
  {
    label: '25%',
    value: 0.25,
  },
  {
    label: '30%',
    value: 0.30,
  },
  {
    label: '35%',
    value: 0.35,
  },
  {
    label: '40%',
    value: 0.40,
  },
  {
    label: '45%',
    value: 0.45,
  },
  {
    label: '50%',
    value: 0.50,
  },
];

class SnowballForm extends Component {

  state = {
  };



  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  renderItemList = () => {
    const {classes} = this.props;
    return (
      <Grid item>
        <Typography variant="h6" className={classes.title}>
          Location
        </Typography>
        <div className={classes.demo}>
          <List>
            {
              this.props.snowball.items.map((val, idx) => {
                return (
                  <ListItem key={idx}>
                    <ListItemText
                      primary={val.name}
                    />
                    <ListItemSecondaryAction>
                      <IconButton aria-label="Delete" onClick={
                        this.props.removeItem.bind(val, idx)}>
                        <DeleteIcon/>
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                )
              })
            }

          </List>
        </div>
        <ItemModal addItem={this.props.addItem}>Add Item</ItemModal>

      </Grid>
    )
  };


  render() {
    const {classes} = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Snowball Details
        </Typography>
        <Grid container spacing={8}>
          <Grid item xs={12} sm={12}>
            <TextField
              required
              id="name"
              name="name"
              label="Snowball Name"
              fullWidth
              value={this.props.snowball.name}
              onChange={(e) => this.props.handleChange('name', e.target.value)}

            />
          </Grid>

          <Grid item xs={12} sm={12} md={12}>
            <TextField
              required
              id="description"
              name="description"
              onChange={(e) => this.props.handleChange('description', e.target.value)}
              value={this.props.snowball.description || ''}
              label="Description (max length 200 characters)"
              fullWidth
              multiline
              error={this.state.descriptionError}

            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              required
              id="threshold-select"
              select
              label="Select the user threshold for your Snowball"
              className={classes.textField}
              value={this.props.snowball.threshold}
              onChange={(e) => this.props.handleChange('threshold', e.target.value)}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              helperText="Please select the threshold number of users for your Snowball."
              margin="normal"
            >
              {thresholds.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>


          <Grid item sm={6} xs={12} md={6}>
            <TextField
              id="standard-number"
              label="Quantity of Snowballs"
              value={this.props.snowball.quantity}
              onChange={(e) => this.props.handleChange('quantity', e.target.value)}
              type="number"
              // className={classes.textField}
              InputLabelProps={{
                shrink: true,
              }}
              fullWidth
              required
            />
          </Grid>

          <Grid item xs={12} sm={6} md={6}>
            <TextField
              required
              id="threshold-select"
              select
              label="Discount Percent"
              className={classes.textField}
              value={this.props.snowball.discountPercentage}
              onChange={(e) => this.props.handleChange('discountPercentage', e.target.value)}
              SelectProps={{
                MenuProps: {
                  className: classes.menu,
                },
              }}
              fullWidth
            >
              {discountPercents.map(option => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Grid>



          <Grid item xs={12} sm={6} md={6}>
            <TextField
              required
              label="Original Price"
              value={this.props.snowball.price}
              onChange={(e) => this.props.handleChange('price', e.target.value)}
              id="formatted-numberformat-input"
              InputProps={{
                inputComponent: NumberFormatCustom,
              }}
              fullWidth

            />
          </Grid>
          {(Number(this.props.snowball.price) !== 0 ) &&
            <Grid item sm={12} xs={12} md={12}>

              <Typography variant="h6" gutterBottom>
                Price per
                person {formatMoney(
                computeAveragePriceWithReward(
                  this.props.snowball.discountPercentage,
                  this.props.snowball.price,
                  this.props.snowball.threshold))}

              </Typography>
            </Grid>
          }


          {this.renderItemList()}
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(SnowballForm);
