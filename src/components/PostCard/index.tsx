import React from "react"
import { Edge } from "../../templates/PostList/query"
import { Icon, Card } from 'semantic-ui-react'
import styled from 'styled-components'
import { navigate } from "gatsby"


const PostExtra = styled.div`
  padding: 0em 2em;
  height: 15%;
  background-color: black;
  color: #AAAAAA;
  font-size: 0.8em;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const FancyTitleLink = styled.div`
      color: #DDD;
      text-decoration: none;
      transition: all 0.3s ease 0.1s;

      &:hover{
        color: white;
        cursor: pointer;
      };
      hr{
        margin-top:0.5rem;
        background: white;

      }
`

export interface Props {
  edge: Edge
}

const PostCard: React.SFC<Props> = (props) => {
  const edge = props.edge
  const frontmatter = edge.node.frontmatter
  const tags = frontmatter.tags == null ? "无标签" : frontmatter.tags.slice(0, 4).join(', ')
  const url = edge.node.fields.slug
  return (
    <Card
      fluid
      meta={" "}
      // onClick={() => navigate(url)}
      header={
        <FancyTitleLink onClick={() => navigate(url)}>
          {frontmatter.title}
          <hr />
        </FancyTitleLink>
      }
      description={edge.node.excerpt}
      extra={
        <PostExtra>
          <span>
            <Icon name={"clock outline"} />
            {frontmatter.date}
          </span>
          <span>
            <Icon name={"tags"} />
            {tags}
          </span>
        </PostExtra>

      }
    />

  )
}


export default PostCard
