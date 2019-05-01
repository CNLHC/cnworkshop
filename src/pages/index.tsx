import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import { graphql } from 'gatsby'
import Seo from "../components/seo"
import PrimarySearchAppBar from "../components/HeadBar";
import PostList from "../components/PostList"
import { generateURL } from "../common/category"

const IndexPage = ({data}) => {

  console.log(data)

  const postMetaList:any = data.allMarkdownRemark.edges.map(e=>({
    id:e.node.id,
    excerpt:e.node.excerpt,
    title:e.node.frontmatter.title,
    url:generateURL(e.node.fileAbsolutePath,e.node.frontmatter.codeName)
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
          fileAbsolutePath
          frontmatter {
            title
            codeName
          }
        }
      }
    }
  }
`

export default IndexPage
