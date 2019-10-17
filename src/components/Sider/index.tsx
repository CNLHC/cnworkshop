import React from "react"
import { Sidebar, Menu } from "semantic-ui-react"
import Styles from './index.module.scss'
import styled from "styled-components"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"


const CenterText = styled.div`
text-align:center;
color: white;
a{
  text-decoration:none;
  color: white;
}
a:hover{
  color: white;
}
`
const BlogSider = () => <StaticQuery
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
  render={(data) =>
    <Sidebar
      width="thin"
      direction={"left"}
      as={Menu}
      visible={true}
      vertical
    >
      <div className={Styles.avtar}>
        <div className={Styles.imgContainer}>
          <Img fluid={data.file.childImageSharp.fluid} />
        </div>
      </div>

      <CenterText>
        <Menu.Item
          header
        ><a href={"/all"}> 归档</a></Menu.Item>
        <Menu.Item as='span'>标签</Menu.Item>
        <Menu.Item as='a'>时间</Menu.Item>
        <Menu.Item as='span'>关于</Menu.Item>
      </CenterText>
    </Sidebar>
  }
/>


export default BlogSider