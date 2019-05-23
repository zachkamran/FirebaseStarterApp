import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import HomeIcon from '@material-ui/icons/Home';

import AssignmentIcon from '@material-ui/icons/Assignment';
import List from '@material-ui/core/List'
import history from '../history';


function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}


export class MainListItems extends React.Component {
  render() {
    console.log(this.props);
    return (
      <List>
        <div style={{alignItems: 'center'}}>

          <ListItemLink href="/profile">
            <ListItemIcon>
              <HomeIcon/>
            </ListItemIcon>
            <ListItemText primary="Home"/>
          </ListItemLink>

          {/*<ListItemLink href={'/dashboard'}>*/}
          {/*  <ListItemIcon>*/}
          {/*    <DashboardIcon/>*/}
          {/*  </ListItemIcon>*/}
          {/*  <ListItemText primary="Produce"/>*/}
          {/*</ListItemLink>*/}


          {/*<ListItemLink href={'customers'}>*/}
          {/*  <ListItemIcon>*/}
          {/*    <PeopleIcon/>*/}
          {/*  </ListItemIcon>*/}
          {/*  <ListItemText primary="Customers"/>*/}
          {/*</ListItemLink>*/}

          {/*<ListItem button>*/}
            {/*<ListItemIcon>*/}
              {/*<BarChartIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary="Reports"/>*/}
          {/*</ListItem>*/}

          {/*<ListItem button>*/}
            {/*<ListItemIcon>*/}
              {/*<LayersIcon/>*/}
            {/*</ListItemIcon>*/}
            {/*<ListItemText primary="Integrations"/>*/}
          {/*</ListItem>*/}

        </div>
      </List>
    );
  }
}


export const secondaryListItems = (
  <div>
    <ListSubheader inset>Saved reports</ListSubheader>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
      <ListItemText primary="Current month"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
      <ListItemText primary="Last quarter"/>
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <AssignmentIcon/>
      </ListItemIcon>
      <ListItemText primary="Year-end sale"/>
    </ListItem>
  </div>
);

