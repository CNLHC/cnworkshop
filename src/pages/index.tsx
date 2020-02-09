import React, { useLayoutEffect } from "react"
import Layout from "../components/Layout/layout"
import PostList from "../components/PostList"
import { graphql, navigate } from 'gatsby'
import PageArchive from "../components/archive"
import SEO from "../components/seo"



const IndexPage = ({ data }) => {
  // useLayoutEffect(() => {
  //   navigate("/all")
  // }, [])


  return (
    <>
      <SEO />
      <PageArchive data={data} />
    </>
  )
}

export const query = graphql`
  query IndexPostList {
    allMdx(
      limit:50,
      sort: {order: DESC, fields: frontmatter___date}
    ) {
      edges {
        node {
          id
          fields {
            slug
          }
          excerpt
          fileAbsolutePath
          timeToRead
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
