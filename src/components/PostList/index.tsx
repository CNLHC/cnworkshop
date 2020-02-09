import React from "react"
import PostCard from "../PostCard"
import { useTheme } from "@material-ui/core"
import useStyles from "./style"
import { PostListWithFilter } from "../../templates/PostList/__generated__/PostListWithFilter"


export interface Props {
  data: PostListWithFilter
}


const PostList = (props: Props) => {
  const { data } = props
  const theme = useTheme()
  const style = useStyles(theme)
  console.log(data)
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
