import React from 'react';
import { WithStyles, withStyles } from "@material-ui/core/styles"
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

const styles = {
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
};

export interface Props extends WithStyles<typeof styles> {
  drawerOpen:boolean
  onDrawerClose:()=>void
}


class TemporaryDrawer extends React.Component<Props,any>{
  state = {
    top: false,
    left: false,
    bottom: false,
    right: false,
  };

  render() {
    const { classes } = this.props;

    const sideList = (
      <div className={classes.list}>
        <List>
          {['这个', '侧边栏', '还没有', '启用'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {['不知道', '用它', '做什么'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </div>
    );

    return (
        <Drawer open={this.props.drawerOpen} onClose={this.props.onDrawerClose}>
          <div
            tabIndex={0}
            role="button"
          >
            {sideList}
          </div>
        </Drawer>
    );
  }
}


export default withStyles(styles)(TemporaryDrawer);