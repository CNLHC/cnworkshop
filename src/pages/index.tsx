import React from "react"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import PostList from "../components/PostList"
import { IPostMeta } from "../Typings/Post"
import 'font-awesome/css/font-awesome.min.css';


const IndexPage = ({data}) => {


  const postMetaList:IPostMeta= data.allMarkdownRemark.edges.map(e=>({
    id:e.node.id,
    excerpt:e.node.excerpt,
    title:e.node.frontmatter.title,
    url:e.node.fields.slug,
    tags:e.node.frontmatter.tags,
    date:e.node.frontmatter.date
  }))

  return (
    <Layout>
      {/* <PostList  data={postMetaList}/> */}
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
