import React from "react"
import Layout from "../../components/layout"
import PostList from "../../components/PostList"
import { IQuery } from "./query"
import { graphql} from "gatsby"

require(`katex/dist/katex.min.css`)
require("prismjs/themes/prism-tomorrow.css")


const PostPage = ({ data }:{data:IQuery}) => {

  return (
  <Layout>
    <PostList data={data} />
  </Layout>);
}

export const query = graphql`
    query($offset:Int!,$limit:Int!) {
      allMarkdownRemark(
        skip:$offset
        limit:$limit
        ) {
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

export default PostPage


