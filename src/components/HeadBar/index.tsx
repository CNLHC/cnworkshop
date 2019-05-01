import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import {withStyles, WithStyles} from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import {styles} from "./styles";

export interface Props extends WithStyles<typeof styles> {
    onClickDrawerButton:()=>void
    siteMeta:{
        title:string
    }
}

class SearchAppBar extends React.Component<Props,any>{
    render(){
        const {classes} = this.props
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Open drawer" onClick={this.props.onClickDrawerButton}>
                            <MenuIcon />
                        </IconButton>
                        <Typography className={classes.title} variant="h6" color="inherit" noWrap>
                            {this.props.siteMeta.title}
                        </Typography>
                        <div className={classes.grow}/>
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                            />
                        </div>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


export default withStyles(styles)(SearchAppBar);