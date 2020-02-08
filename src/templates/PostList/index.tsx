import React from "react"
import { IQuery } from "./query"
import { graphql } from "gatsby"
import PageArchive from "../../components/archive";



const PostPage = ({ data }: { data: IQuery }) => {
  return (<PageArchive data={data} />);
}

export const query = graphql`
    query PageListWithOffsetLimit($offset:Int!,$limit:Int!) {
      allMarkdownRemark(
        skip:$offset
        limit:$limit
        sort: {order: DESC, fields: frontmatter___date}
        ) {
          edges {
            node {
              id
              excerpt
              fields{
                slug
              }
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


