/*
The profile page has

is a tab on main dashboard.
Uses cards one card for business photos. One card to add snowballs. One card to add/edit location.

 */

import React, {Component} from 'react';
import {auth} from "../firebase";

import {withStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/core/SvgIcon/SvgIcon";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import {MainListItems} from "./listItems";
import ProfileGrid from "../profile/profile-grid";
import classNames from 'classnames';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import firebase from "../firebase/firebase";
import {Collections as Constants} from "../constants/Collections";
import ProductItemInfo from "./ProductItemInfo"
import SimpleLineChart from "./SimpleLineChart";
import {Paper} from "@material-ui/core";

const drawerWidth = 240;

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            height: this.props.index === 0 ? this.props.height * 2 : this.props.height,
            user: null,
            loading: true,
            open: false,
            data: [],
            priceCap: 0.5,
            throwawayPercentage: 0.06,
            poundsPerYear: 10400,
        }
    };

    async componentDidMount() {
        const user = await auth.getAuth().currentUser;
        this.setState({user});
        console.log(user.uid);

        const profile = await firebase.firestore().collection(Constants.PLACES).doc(user.uid).get();
        this.setState({profile: profile.data()});

        firebase.firestore().collection('weekly-prices').orderBy("date", "desc").limit(1).get()
            .then((querySnapshot) => {
                let tempData = [];
                querySnapshot.forEach((doc) => {
                    const tempObj = {
                        id: doc.id,
                        date: doc.data().date,
                        price: doc.data().price
                    };
                    tempData.push(tempObj);
                });
                this.setState({data: tempData, loading: false})
            })
            .catch((error) => console.log(`An error occurred: ${error}`));
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
                        {/*<Typography variant="h4" gutterBottom component="h2">*/}
                        {/*    /!*{this.state.profile.name}*!/*/}
                        {/*    {`Avocado Information`}*/}
                        {/*</Typography>*/}
                        <Paper style={{paddingTop: 2, paddingBottom: 2,}}>
                            <Typography style={{marginTop: 40, marginLeft: 20, margin: 40}} variant="h4" gutterBottom
                                        component="h2">
                                {`Price versus Date (Actuals and Forecast)`}
                            </Typography>
                            <Typography component="div" className={classes.chartContainer}>
                                {/*<ProfileGrid connected={this.state.isStripeConnected}/>*/}
                                <SimpleLineChart/>
                            </Typography>
                        </Paper>

                        <Paper style={{marginTop: 40, marginBottom: 40, paddingTop: 2, paddingBottom: 2,}}>
                            <Typography style={{marginTop: 20, marginLeft: 20, margin: 20}} variant="h4" gutterBottom
                                        component="h2">
                                {`Overview`}
                            </Typography>
                            <Typography style={{marginTop: 20, marginLeft: 20, margin: 20}} variant="h5" gutterBottom
                                        component="h2">
                                {`Date: April 13th, 2019`}
                            </Typography>
                            <Typography style={{marginTop: 20, marginLeft: 20, margin: 20}} variant="h5" gutterBottom
                                        component="h2">
                                {`Current Optimal Price: $${this.state.data[0].price.toFixed(2)}/lb`}
                            </Typography>
                        </Paper>

                        <Paper style={{marginTop: 40, marginBottom: 40, paddingTop: 2, paddingBottom: 2,}}>
                            <Typography style={{marginTop: 20, marginLeft: 20, margin: 20}} variant="h4" gutterBottom
                                        component="h2">
                                {`Business Information`}
                            </Typography>
                            <Typography style={{marginTop: 20, marginLeft: 20, margin: 20}} variant="h5" gutterBottom
                                        component="h2">
                                {`Revenue Increase: $${((((this.state.priceCap * (1-this.state.throwawayPercentage)) - this.state.data[0].price) * this.state.poundsPerYear).toFixed(2))}`}
                            </Typography>
                            <Typography style={{marginTop: 20, marginLeft: 20, margin: 20}} variant="h5" gutterBottom
                                        component="h2">
                                {`Waste Percentage: 0%`}
                            </Typography>
                        </Paper>

                    </main>
                </div>
            )
        } else {
            return <div/>
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
