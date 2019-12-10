import { graphql, StaticQuery } from "gatsby"
import React from "react"
import BlogSidebar from "../SideBar"
import { makeStyles, createStyles } from "@material-ui/styles"
import { Theme, useTheme } from "@material-ui/core"
import { RightSide } from "./style"

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    "@global": {
      body: {
        margin: 0,
        background: theme.palette.grey[900],
      },
    },
    root: {
      display: "flex",
      width: "100%",
      height: "100%",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    sidePusher: {},
    PageContent: {
      padding: "2rem",
      minHeight: "100vh",
    },
    Footer: {
      width: "100%",
      backgroundColor: "black",
      color: "#999",
      fontSize: "0.7rem",
      textAlign: "center",
      marginTop: theme.spacing(1, 3),
      height: "2em",
    },
  })
)

class Layout extends React.Component<
  { children: React.ReactNode[] | React.ReactNode },
  { drawerOpen: boolean }
> {
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
        render={_data => {
          const theme = useTheme()
          const style = useStyles(theme)
          return (
            <div className={style.root}>
              <BlogSidebar />
              <RightSide>
                <div className={style.PageContent}>{this.props.children}</div>
                <div className={style.Footer}>
                  <span> Powered by React.js and GraphQL</span>
                  <span>
                    {" "}
                    <a href={"http://www.beian.miit.gov.cn"}>
                      京ICP备19023616号-1{" "}
                    </a>{" "}
                  </span>
                </div>
              </RightSide>
            </div>
          )
        }}
      />
    )
  }
}

export default Layout
