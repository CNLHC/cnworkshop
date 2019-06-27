import React from "react"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import Grid from "@material-ui/core/Grid"
import { IPostMeta } from "../../Typings/Post"
import PostCard from "../PostCard"
import   Styles from './index.module.scss'

const styles = ({
})

export interface Props extends WithStyles<typeof styles> {
  data: IPostMeta[]
}

class PostList extends React.Component<Props, any> {
  public render() {
    const ItemTemplate = (props: { data: IPostMeta }) => <PostCard postMeta={props.data}/>
    return (
      <div className={Styles.root}>
        <Grid container  className={Styles.container}>
          {this.props.data.map(e => ItemTemplate({ data: e }))}
        </Grid>
      </div>
    )
  }
}


export default withStyles(styles)(PostList)
