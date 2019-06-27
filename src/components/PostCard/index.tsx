import React from "react"
import { Link } from "gatsby"
import { WithStyles, withStyles } from "@material-ui/core/styles"
import Card from "@material-ui/core/Card"
import CardContent from "@material-ui/core/CardContent"
import Typography from "@material-ui/core/Typography"
import { Button, CardActionArea, CardActions, Chip } from "@material-ui/core"
import { IPostMeta } from "../../Typings/Post"
import { styles } from "../HeadBar/styles"
import Styles from "./index.module.scss"

import { faClock, faHome, faTags } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";



export interface Props extends WithStyles<typeof styles> {
  postMeta: IPostMeta
}
class PostCard extends React.Component<Props, any> {
  render() {
    const tags = this.props.postMeta.tags==null?"无标签":this.props.postMeta.tags.slice(0,4).join(', ')
    return (
      <div className={Styles.postCard}>
        <div className={Styles.postBody}>
          <div className={Styles.postTitle}>
            <Link
              to={this.props.postMeta.url}
            >{this.props.postMeta.title}</Link>
            <hr/>
          </div>
          <p className={Styles.exercpt}> {this.props.postMeta.excerpt}</p>
        </div>
        <div className={Styles.postFooter}>
          <span>
            <FontAwesomeIcon icon={faClock} />
            {this.props.postMeta.date}
          </span>
          <span>
            <FontAwesomeIcon icon={faTags} />
            {tags}
          </span>
        </div>
      </div>
    )
  }
}


export default withStyles(styles)(PostCard)