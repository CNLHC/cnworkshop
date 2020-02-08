import React from "react"
import { graphql } from "gatsby"
import PageArchive from "../../components/archive";
import { PostListWithFilter } from "./__generated__/PostListWithFilter";

export type TPostListData = PostListWithFilter


const PostPage = ({ data }: { data: PostListWithFilter }) => {
  return (<PageArchive data={data} />);
}

export const query = graphql`
  query PostListWithFilter($offset: Int!, $limit: Int!, $tags: [String], $after: Date, $before: Date) {
    allMarkdownRemark(
        skip: $offset,
        limit: $limit,
        sort: {order: DESC, fields: frontmatter___date}, 
        filter: {
            frontmatter: {
              tags: {in: $tags},
              date: {gte: $after, lte: $before}
            }
        }){
      edges {
        node {
          id
          excerpt
          fields {
            slug
          }
          fileAbsolutePath
          timeToRead
          frontmatter {
            title
            codeName
            date(formatString: "YYYY年MM月DD日HH:MM")
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


