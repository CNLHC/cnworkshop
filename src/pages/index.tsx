import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import Seo from "../components/seo"
import PrimarySearchAppBar from "../components/HeadBar";
import PostList from "../components/PostList"
import { generateURL } from "../common/category"
import { IPostMeta } from "../Typings/Post"

const IndexPage = ({data}) => {

  console.log(data)

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
      <PostList  data={postMetaList}/>
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
            date
            tags
          }
        }
      }
    }
  }
`

export default IndexPage
