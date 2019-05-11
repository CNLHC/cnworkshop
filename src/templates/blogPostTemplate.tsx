import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import './blogPost.css'

require(`katex/dist/katex.min.css`)
require("prismjs/themes/prism-tomorrow.css")


const PostPage = ({ data }) => (
  <Layout>

    <div>
      <div style={{
        position:'relative',
        left:"100%"
      }}>
      <div
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.tableOfContents }}
        style={{
          position:"fixed",
          textDecoration:'none'
        }}
        className={'toc'}



      />
      </div>
    <div
      dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
    />
    </div>


    <Link to="/">返回首页</Link>
  </Layout>
)

export const query = graphql`
  query($codeName: String!) {
    markdownRemark(frontmatter: { codeName: { eq: $codeName} }) {
      html
      tableOfContents(pathToSlugField: "fields.slug", heading: null, maxDepth: 4)
    }
  }
`
export default PostPage

