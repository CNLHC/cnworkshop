
import React from 'react'
import useStyles from './style'
import { useTheme } from '@material-ui/core'
import { StaticQuery, graphql } from 'gatsby'
import Img from "gatsby-image"

export default function QuickInfo() {
    const theme = useTheme()
    const style = useStyles(theme)

    return (

        <StaticQuery
            query={graphql`
      query  AvatarQuery {
        file(relativePath: {eq:"avatar.png"} ){
          childImageSharp{
            fluid{
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
`}
            render={(data) => <div>
                <div className={style.avatar}>
                    <div className={style.imgContainer}>
                        <Img fluid={data.file.childImageSharp.fluid} />
                    </div>
                </div>

            </div>
            }
        />
    )
}

