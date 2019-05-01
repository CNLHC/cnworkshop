import React from "react"
import { Link } from "gatsby"
import { graphql } from 'gatsby'
import Layout from "../components/layout"

const PostPage = ({data}) => (
  <Layout>

    <div
      dangerouslySetInnerHTML={{__html:data.markdownRemark.html}}
    />
    <Link to="/">返回首页</Link>
  </Layout>
)

export const query=graphql`
  query($codeName: String!) {
    markdownRemark(frontmatter: { codeName: { eq: $codeName} }) {
      html
    }
  }
`
export default PostPage

