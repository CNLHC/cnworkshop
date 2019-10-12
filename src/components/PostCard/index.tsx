import React from "react"
import { Link } from "gatsby"
import Styles from "./index.module.scss"
import { faClock, faTags } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Edge } from "../../templates/PostList/query"

export interface Props {
  edge: Edge
}
class PostCard extends React.Component<Props, any> {
  render() {
    const edge = this.props.edge
    const frontmatter = edge.node.frontmatter
    const tags = frontmatter.tags == null ? "无标签" : frontmatter.tags.slice(0, 4).join(', ')
    const url = edge.node.fields.slug
    return (
      <div className={Styles.postCard}>
        <div className={Styles.postBody}>
          <div className={Styles.postTitle}>
            <Link
              to={url}
            >{frontmatter.title}</Link>
            <hr />
          </div>
          <p className={Styles.exercpt}> {edge.node.excerpt}</p>
        </div>
        <div className={Styles.postFooter}>
          <span>
            <FontAwesomeIcon icon={faClock} />
            {frontmatter.date}
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


export default PostCard
