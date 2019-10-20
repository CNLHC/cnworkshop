import { graphql, StaticQuery } from "gatsby"
import React from "react"
import Styles from "./layout.module.scss"
import BlogSider from "./SideBar"
import { Sidebar } from "semantic-ui-react"
import styled from "styled-components"
import { makeStyles, createStyles, ThemeProvider } from "@material-ui/styles"
import { Theme, useTheme } from "@material-ui/core"
import Dark from '../theme/dark'

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
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      body:{
        margin:0,
        background: theme.palette.grey[900]
      }
    },
    root: {
      display: 'flex',
      width:'100%',
      height:'100%'
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    sidePusher: {
      flexGrow: 1,
    },
    toolbar: theme.mixins.toolbar,
  }),
);


class Layout extends React.Component
  <{ children: React.ReactNode[] | React.ReactNode }
  , { drawerOpen: boolean }> {
  state = {
    drawerOpen: false,
  }

  render() {
    return (
      <ThemeProvider theme={Dark}>
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
            const style = useStyles(Dark)
            return (
              <div className={style.root}>
                <BlogSider />
                <div className={style.sidePusher}>
                  {this.props.children}
                  <Footer>
                    <span> Powered by React.js and GraphQL</span>
                    <span> <a href={"http://www.beian.miit.gov.cn"}>京ICP备19023616号-1	</a>  </span>
                  </Footer>
                </div>
              </div>
            );
          }}
        />
      </ThemeProvider>
    )
  }

}


export default Layout
