import React from "react"
import PostCard from "../PostCard"
import { useTheme } from "@material-ui/core"
import useStyles from "./style"


export interface Props {
  data: GatsbyTypes.PostListWithFilterQuery
}


const PostList = (props: Props) => {
  const { data } = props
  const theme = useTheme()
  const style = useStyles(theme)
  console.log(11, data)
  return (
    <div className={style.CardContainer}>
      {data.allMdx.edges.map(e =>
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
