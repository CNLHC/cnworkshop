import React from "react"
import { Link } from "gatsby"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { IPostMeta } from "../../Typings/TypePost"
import { Button, CardActionArea, CardActions } from "@material-ui/core"

const styles = {
  card: {
    width: "100%",
    height:"100%"
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
    padding: "10px 0",

  },
  pos: {
    marginBottom: 12,
  },
  content:{
     padding: "10px 10px",
    minHeight:'150px'
  }
}

export interface Props extends WithStyles<typeof styles> {
  postMeta: IPostMeta
}

class PostCard extends React.Component<Props, any> {
  render() {
    const { classes } = this.props
    const bull = <span className={classes.bullet}>•</span>
    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardContent className={classes.content}>
            <Typography className={classes.title} gutterBottom variant="h2" component="h2">
              {this.props.postMeta.title}
            </Typography>
            <Typography color="textSecondary">
              {this.props.postMeta.excerpt}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Link to={this.props.postMeta.url} style={{textDecoration:"none"}}>
            <Button size="small" color="primary">
              查看更多
            </Button>
          </Link>
        </CardActions>
      </Card>
    )
  }
}


export default withStyles(styles)(PostCard)