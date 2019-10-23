import React, { useLayoutEffect } from "react"
import Layout from "../components/layout"
import PostList from "../components/PostList"
import { graphql, navigate } from 'gatsby'
import PageArchive from "../components/archive"



const IndexPage = ({ data }) => {
  // useLayoutEffect(() => {
  //   navigate("/all")
  // }, [])


  return (
    <PageArchive data={data} />
  )
}

export const query = graphql`
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
