import React from "react"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { IPostMeta } from "../../Typings/TypePost"
import PostCard from "../PostCard"

const styles = ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: 8,
  },
  container:{
    alignItems:"stretch",
    // direction:"column"
  }
})

export interface Props extends WithStyles<typeof styles> {
  data: IPostMeta[]
}

class PostList extends React.Component<Props, any> {
  public render() {
    const { classes } = this.props
    const ItemTemplate = (props:{data:IPostMeta}) => <Grid item xs={12} sm={12} md={6} lg={4} key={props.data.id} >
      <PostCard postMeta={props.data}/>
    </Grid>
    return (
      <div className={classes.root}>
        <Grid container spacing={16} className={classes.container}>
          {this.props.data.map(e => ItemTemplate({data:e}))}
        </Grid>
      </div>
    )
  }
}


export default withStyles(styles)(PostList)
