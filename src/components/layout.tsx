import { graphql, StaticQuery } from "gatsby"
import React from "react"
import Styles from "./layout.module.scss"
import BlogSider from "./Sider"
import { Sidebar } from "semantic-ui-react"
import styled from "styled-components"

const Footer = styled.div`
  width: 100%;
  background-color: black;
  color: #999;
  font-size: 0.7rem;
  text-align: center;




  height: 3em;
  a{
    color: white;
  }


`

class Layout extends React.Component
  <{ children: React.ReactNode[] | React.ReactNode }
  , { drawerOpen: boolean }> {
  state = {
    drawerOpen: false,
  }

  render() {
    return (
      <StaticQuery
        query={graphql`

      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
        render={data => {
          console.log(data)
          return (<div>
            <BlogSider />
            <Sidebar.Pusher>
              <div className={Styles.blogContent}>
                {this.props.children}
              </div>
            </Sidebar.Pusher>
            <Footer>
              <span> Powered by React.js and GraphQL</span>
              <span> <a href={"http://www.beian.miit.gov.cn"}>京ICP备19023616号-1	</a>  </span>
            </Footer>
          </div>);
        }}
      />
    )
  }

}


export default Layout
