import React, { useCallback } from "react"
import { Drawer, ListItem, ListItemText, Divider, useTheme } from '@material-ui/core';
import { navigate } from "@reach/router";
import QuickInfo from "../QuickPersonal";
import useStyles from './style'

const BlogSidebar = () => {
  const theme = useTheme()
  const classes = useStyles(theme)

  const NavItem = useCallback(
    (props: { title: string, onClick: () => void }) => <div className={classes.navItem} onClick={props.onClick}>
      <ListItem button alignItems="center">
        <ListItemText primary={props.title} style={{ textAlign: "center" }} />
      </ListItem>
    </div>
    ,
    [classes],
  )

  return <Drawer
    className={classes.drawer}
    classes={{
      paper: classes.drawerPaper,
    }}
    variant="permanent"
  >

    <QuickInfo />

    <Divider />

    <div className={classes.navMenu}>
      <NavItem title={"归档"} onClick={() => navigate("/all")} />
      <NavItem title={"标签"} onClick={() => navigate("")} />
      <NavItem title={"时间"} onClick={() => navigate("")} />
      <NavItem title={"关于"} onClick={() => navigate("")} />
    </div>

  </Drawer>;

}


export default BlogSidebar