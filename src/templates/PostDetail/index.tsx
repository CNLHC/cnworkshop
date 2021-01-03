import React from "react"
import { graphql } from "gatsby"
import { IQuery } from "./query"
import PostDetail from "../../components/PageDetail"


const PostPage = (props: { data }) => (<PostDetail data={props.data} />)

export const query = graphql`
    query PageDetailByCodeName($codeName: String!) {
        mdx(frontmatter: { codeName: { eq: $codeName} }) {
            body
            tableOfContents( maxDepth: 4)
        }
    }
`
export default PostPage

