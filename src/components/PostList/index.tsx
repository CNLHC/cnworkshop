import React from "react"
import PostCard from "../PostCard"
import { IQuery } from '../../templates/PostList/query'
import { useTheme } from "@material-ui/core"
import useStyles from "./style"


export interface Props {
  data: IQuery
}


const PostList = (props: Props) => {
  const { data } = props
  const theme = useTheme()
  const style = useStyles(theme)
  return (
    <div className={style.CardContainer}>
      {data.allMarkdownRemark.edges.map(e =>
        <div
          key={`postCard-${e.node.id}`}
          className={style.CardWrapper}>
          <PostCard
            edge={e} />
        </div>
      )}
    </div>
  )
}


export default (PostList)
