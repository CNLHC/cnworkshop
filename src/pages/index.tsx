import React from "react"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import PostList from "../components/PostList"
import { IPostMeta } from "../Typings/Post"
import 'font-awesome/css/font-awesome.min.css';


const IndexPage = ({data}) => {


  return (
    <Layout>
      <PostList  data={data}/>
    </Layout>
  )
}

export const query=graphql`
  {
    allMarkdownRemark {
      edges {
        node {
          id
          excerpt
          fields{
            slug
          }
          fileAbsolutePath
          frontmatter {
            title
            codeName
            date(formatString:"YYYY年MM月DD日HH:MM")
            tags
          }
        }
      }
    }
  }
`

export default IndexPage
