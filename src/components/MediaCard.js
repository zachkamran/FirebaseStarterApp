import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Component} from 'react';
import {standardImageUrl} from '../constants/StaticImages';
import staticImage from '../assets/squarespace-01.png'

const styles = {
    card: {
        flex: 1,
        flexDirection: 'row',
        margin: 10,
        width: 600,
    },
    media: {
        flex: 1,
        height: 300,
    },
};

class MediaCard extends Component {
    render() {
        const {classes} = this.props;
        return (
            <Card className={classes.card}>
                <div style={{flexDirection: 'row', width: '100%', height: '100%'}}>
                    <div style={{width: '50%', height: '100%', float:'left'}}>
                        <CardActionArea>
                            <CardMedia
                                className={classes.media}
                                image={this.props.image !== undefined ? this.props.image : staticImage}
                                title={this.props.title}
                            />
                        </CardActionArea>
                    </div>
                    <div style={{width: '50%', height: '100%', float:'left'}}>
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                                {this.props.title}
                            </Typography>
                            <Typography component="p">
                                {this.props.currentPrice}
                            </Typography>
                            <Typography component="p">
                                {this.props.description}
                            </Typography>
                        </CardContent>
                    </div>
                </div>
                <CardActions>
                    <Button size="small" color="primary" onClick={() => this.props.handleAction1()}>
                        {this.props.action1}
                    </Button>
                    {this.props.action2 && (
                        <Button size="small" color="primary" onClick={() => this.props.handleAction2()}>
                            {this.props.action2}
                        </Button>
                    )}

                </CardActions>
            </Card>
        );
    }
}

MediaCard.propTypes = {
    classes: PropTypes.object.isRequired,
    Title: PropTypes.string.isRequired,
    description: PropTypes.string,
    action1: PropTypes.string,
    action2: PropTypes.string,
    handleAction1: PropTypes.func,
    handleAction2: PropTypes.func

};

export default withStyles(styles)(MediaCard);
