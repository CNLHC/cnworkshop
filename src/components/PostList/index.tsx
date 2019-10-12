import React from "react"
import  PostCard from "../PostCard"
import   Styles from './index.module.scss'
import {IQuery, Edge} from '../../templates/PostList/query'


export interface Props {
  data: IQuery
}

class PostList extends React.Component<Props, any> {
  public render() {
    const ItemTemplate = (props: { data:Edge}) => <PostCard edge={props.data}/>
    const {data} = this.props
    return (
      <div className={Styles.root}>
        <div className={Styles.container}>
         {data.allMarkdownRemark.edges.map(e => ItemTemplate({ data: e }))}
        </div >
      </div>
    )
  }
}


export default (PostList)
