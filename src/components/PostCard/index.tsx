import React from "react"
import { Edge } from "../../templates/PostList/query"
import styled from 'styled-components'
import { navigate } from "gatsby"
import { Card, Typography, useTheme, CardActionArea, CardActions, Button } from "@material-ui/core"
import useStyles from "./style"
import { CardContent } from "semantic-ui-react"


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
  const theme = useTheme()
  const style = useStyles(theme)
  const edge = props.edge
  const frontmatter = edge.node.frontmatter
  const tags = frontmatter.tags == null ? "无标签" : frontmatter.tags.slice(0, 4).join(', ')
  const url = edge.node.fields.slug

  return (
    <Card className={style.card}>
      <CardActionArea onClick={() => navigate(url)}>
        <CardContent className={style.CardContent}>
          <Typography gutterBottom variant="h5" component="h2">
            {frontmatter.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {edge.node.excerpt}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
          Learn More
        </Button>
      </CardActions>
    </Card>
  )
}


export default PostCard
