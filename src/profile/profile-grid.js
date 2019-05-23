import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MediaCard from '../components/MediaCard';
import {Component} from 'react';
import history from '../history';
import pinkerton from '../assets/pinkerton.png';
import reed from '../assets/reed.png';
import hass from '../assets/hass.png';
import bacon from '../assets/bacon.png';

import stripeConnect from '../assets/stripeConnect.png'
import firebase from "../firebase/firebase";

const styles = theme => ({
    root: {
        flexGrow: 1,
        width: '100%',
        height: '100%'
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
});

const avoData = [];

firebase.firestore().collection('weekly-prices').orderBy("date", "desc").limit(1).get()
    .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            const tempObj = {
                id: doc.id,
                date: doc.data().date,
                price: doc.data().price
            };
            avoData.push(tempObj);
        });
    })
    .catch((error) => console.log(`An error occurred: ${error}`));

export class ProfileGrid extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Grid style={{justify: 'space-evenly', marginLeft: '5px'}} container spacing={32} >
                    <Grid item md={6}>
                        <MediaCard
                            title={"Bacon"}
                            currentPrice={`$ ${avoData[0].price.toFixed(2)}`}
                            description={"Bacon variety of avocado"}
                            action1={"Learn More"}
                            image={bacon}
                            handleAction1={function () {history.push('produce-item')
                        }}/>
                    </Grid>
                    <Grid item md={6}>
                        <MediaCard title={"Hass"}
                                   currentPrice={`$ 0.48`}
                                   description={"Hass variety of avocado"}
                                   action1={"Learn More"}
                                   image={hass}
                                   handleAction1={function () {history.push('produce-item')
                                   }}/>
                    </Grid>
                    <Grid item md={6}>
                        <MediaCard title={"Pinkerton"}
                                   currentPrice={`$ 0.52`}
                                   description={"Pinkerton variety of avocado"}
                                   action1={"Learn More"}
                                   image={pinkerton}
                                   handleAction1={function () {
                            history.push("manage-snowballs")
                        }}/>
                    </Grid>
                    <Grid item md={6}>
                        <MediaCard title={"Reed"}
                                   currentPrice={`$ 0.37`}
                                   description={"Reed variety of avocado"}
                                   action1={"Learn More"}
                                   image={reed}
                                   handleAction1={function () {
                            history.push("manage-snowballs")
                        }}/>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ProfileGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProfileGrid);
