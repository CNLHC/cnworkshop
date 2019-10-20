import React from "react"
import { IQuery } from "./query"
import { graphql } from "gatsby"
import PageArchive from "../../pages/archive";



const PostPage = ({ data }: { data: IQuery }) => {
  return (<PageArchive data={data} />);
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
          pageInfo {
            currentPage
            hasNextPage
            hasPreviousPage
            itemCount
            pageCount
            perPage
          }
        }
      }
`

export default PostPage


