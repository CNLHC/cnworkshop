import React from "react"
import { graphql } from "gatsby"
import { IQuery } from "./query"
import PostDetail from "../../components/PageDetail"
import { PageDetailByCodeName } from './__generated__/PageDetailByCodeName'


const PostPage = (props: { data: PageDetailByCodeName }) => (<PostDetail data={props.data} />)

export const query = graphql`
    query PageDetailByCodeName($codeName: String!) {
        mdx(frontmatter: { codeName: { eq: $codeName} }) {
            body
            tableOfContents( maxDepth: 4)
        }
    }
`
export default PostPage

