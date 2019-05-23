import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MediaCard from '../components/MediaCard';
import {Component} from 'react';
import history from '../history';

import stripeConnect from '../assets/stripeConnect.png'
import SimpleTable from "./SimpleTable";
import SimpleLineChart from "./SimpleLineChart";
import Typography from "@material-ui/core/Typography";

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

export class ProductItemInfo extends Component {
    render() {
        const {classes} = this.props;
        return (
            <div className={classes.root}>
                <Typography component="div" className={classes.chartContainer}>
                    <SimpleLineChart />
                </Typography>
            </div>
        );
    }
}

ProductItemInfo.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ProductItemInfo);
