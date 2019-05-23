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
import SnowballForm from './SnowballForm';
import Review from './ConfirmationForm';
import history from "../history";
import IconButton from "@material-ui/core/es/IconButton/IconButton";
import ArrowBack from '@material-ui/icons/ArrowBack';


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
});

const steps = ['Snowball Details', 'Review your Snowball'];

class AddSnowball extends React.Component {
  state = {
    snowball: {
      name: '',
      description: '',
      price: 0,
      discountPrice: '0.0',
      discountPercentage: 0.25,
      threshold: 10,
      quantity: 100,
      items: []
    },
    activeStep: 0,
  };

  getStepContent(step) {
    switch (step) {
      case 0:
        return <SnowballForm handleChange={this.handleChange} removeItem={this.removeItem}
                             addItem={this.addItem}
                             snowball={this.state.snowball}/>;
      case 1:
        return <Review snowball={this.state.snowball}/>;
      default:
        throw new Error('Unknown step');
    }
  }

  addItem = (item) => {
    this.setState((prevState) => {
      const snowball = {...prevState.snowball};
      snowball.items = [...prevState.snowball.items, item];
      return {snowball: snowball};
    })
  };

  removeItem = (idx, e) => {
    this.setState((prevState) => {
      const snowball = {...prevState.snowball};
      const items = snowball.items;
      items.splice(idx, 1);
      snowball.items = [...items];
      return {snowball: snowball};
    });
  };

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleChange = (name, val) => {
    this.setState((prevState) => {
      const snowball = {...prevState.snowball};
      snowball[name] = val;
      return {
        snowball: snowball
      }
    });
  };


  render() {
    const {classes} = this.props;
    const {activeStep} = this.state;
    console.log(this.state.snowball);
    return (
      <React.Fragment>
        <CssBaseline/>
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <IconButton onClick={() => history.push('profile')}>
              <ArrowBack/>
            </IconButton>
            <Typography style={{flex: 1}} variant="h6" color="inherit" noWrap>
              Company name
            </Typography>
          </Toolbar>
        </AppBar>


        <main className={classes.layout}>

          <Paper className={classes.paper}>
            <Typography component="h1" variant="h4" align="center">
              Add Snowball
            </Typography>
            <Stepper activeStep={activeStep} className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>


            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography variant="h5" gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your Snowball is now active. Click here to view active Snowballs or here to go home.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}

                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button onClick={this.handleBack} className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? 'Add Snowball' : 'Next'}
                    </Button>
                  </div>

                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}


export default withStyles(styles)(AddSnowball);
