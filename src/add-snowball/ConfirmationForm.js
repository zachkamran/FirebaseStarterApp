import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import {computeAveragePriceWithReward, formatMoney} from "./addSnowballUtils";

const addresses = ['1 Material-UI Drive', 'Reactville', 'Anytown', '99999', 'USA'];
const payments = [
  {name: 'Card type', detail: 'Visa'},
  {name: 'Card holder', detail: 'Mr John Smith'},
  {name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234'},
  {name: 'Expiry date', detail: '04/2024'},
];

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: '700',
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});


export class Review extends Component {
  render() {
    const {classes, snowball} = this.props;
    return (
      <React.Fragment>
        <Typography variant="h6" gutterBottom>
          Snowball Summary
        </Typography>
        <List disablePadding>
          {snowball.items.map(product => (
            <ListItem className={classes.listItem} key={product.name}>
              <ListItemText primary={product.name} secondary={product.desc}/>
              <Typography variant="body2">{product.price}</Typography>
            </ListItem>
          ))}
          <ListItem className={classes.listItem}>
            <ListItemText primary="Total"/>
            <Typography variant="subtitle1" className={classes.total}>
              {`$${formatMoney(computeAveragePriceWithReward(
                this.props.snowball.discountPercentage,
                this.props.snowball.price,
                this.props.snowball.threshold))}`}
            </Typography>
          </ListItem>
        </List>

        <Grid container spacing={16}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Snowball Overview
            </Typography>
            <Typography gutterBottom>{snowball.name}</Typography>
            <Typography gutterBottom>{snowball.description}</Typography>
          </Grid>
          <Grid item container direction="column" xs={12} sm={6}>
            <Typography variant="h6" gutterBottom className={classes.title}>
              Price Details
            </Typography>
            <Grid container>
                <React.Fragment key={'totalSinglePrice'}>
                <Grid item xs={6}>
                <Typography gutterBottom>{'Number Snowball Teams Available'}</Typography>
                </Grid>
                <Grid item xs={6}>
                <Typography gutterBottom>{snowball.quantity}</Typography>
                </Grid>
                </React.Fragment>

              <React.Fragment key={'totalSinglePrice'}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{'Value per team completion'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{formatMoney(computeAveragePriceWithReward(
                this.props.snowball.discountPercentage,
                this.props.snowball.price,
                this.props.snowball.threshold) * snowball.threshold)}</Typography>
                </Grid>
              </React.Fragment>

              <React.Fragment key={'totalSinglePrice'}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{'Total value of all snowballs'}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{formatMoney(computeAveragePriceWithReward(
                    this.props.snowball.discountPercentage,
                    this.props.snowball.price,
                    this.props.snowball.threshold) * snowball.threshold * snowball.quantity)}</Typography>
                </Grid>
              </React.Fragment>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}


export default withStyles(styles)(Review);
