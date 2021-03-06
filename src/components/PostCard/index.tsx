import React, { useState } from "react"
import styled from 'styled-components'
import { navigate } from "gatsby"
import { Card, Typography, useTheme, CardActionArea, CardActions, Button, Divider, Chip, ButtonGroup, CardContent } from "@material-ui/core"
import useStyles from "./style"
import LocalOfferIcon from '@material-ui/icons/LocalOffer';



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
  edge: GatsbyTypes.PostListWithFilterQuery['allMdx']['edges'][0]
}

const PostCard = (props: Props) => {
  const theme = useTheme()
  const style = useStyles(theme)
  const [raise, setRaise] = useState(false)
  const edge = props.edge
  const frontmatter = edge.node.frontmatter
  const tags = !frontmatter.tags ? ['无标签'] : frontmatter.tags
  const url = edge.node.slug

  return (
    <>
      <Card
        className={style.card}
        raised={raise}
        onMouseEnter={() => setRaise(true)}
        onMouseLeave={() => setRaise(false)}
      >
        <CardActionArea onClick={
          () => navigate(`/${url}`)
        } >
          <CardContent className={style.CardContent}>
            <Typography gutterBottom variant="h5" component="h2" style={{
              marginBottom: "1rem"
            }}>
              {frontmatter.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {edge.node.excerpt}
            </Typography>
          </CardContent>
        </CardActionArea>

        <CardActions className={style.CardActionArea}>
          <div className={style.ActionItem}>
            <Button size="small" >
              {edge.node.frontmatter.date} &nbsp;&nbsp;&nbsp;   阅读时间: {edge.node.timeToRead.toString()}分钟
            </Button>
          </div>

          <div className={style.ActionItem}>
            <LocalOfferIcon />
            {
              tags.map(e =>
                <Button size="small" key={`${edge.node.id}-tag-${e}`} onClick={() => navigate(`/tag/${e.toUpperCase()}/`)}>
                  {e}
                </Button>
              )

            }
          </div>



        </CardActions>
      </Card>


    </>

  )

}


export default PostCard
