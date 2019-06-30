import React from "react"
import { IPostMeta } from "../../Typings/Post"
import  PostCard from "../PostCard"
import   Styles from './index.module.scss'

export interface Props {
  data: IPostMeta[]
}

class PostList extends React.Component<Props, any> {
  public render() {
    const ItemTemplate = (props: { data: IPostMeta }) => <PostCard postMeta={props.data}/>
    return (
      <div className={Styles.root}>
        <div className={Styles.container}>
          {this.props.data.map(e => ItemTemplate({ data: e }))}
        </div >
      </div>
    )
  }
}


export default (PostList)
