import React from "react"
import { graphql} from "gatsby"
import { IQuery } from "./query"
import PostDetail from "../../components/PageDetail"


const PostPage = (props:{ data:IQuery}) => {
  return (<PostDetail data={props.data}/>);
}

export const query = graphql`
    query($codeName: String!) {
        markdownRemark(frontmatter: { codeName: { eq: $codeName} }) {
            html
            tableOfContents(pathToSlugField: "fields.slug", heading: null, maxDepth: 4)
        }
    }
`
export default PostPage

