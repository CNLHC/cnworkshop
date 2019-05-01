/**
 * Layout component that queries for data
 * with Gatsby's StaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/static-query/
 */

import { graphql, StaticQuery } from "gatsby"
import React from "react"
import "./layout.css"
import SearchAppBar from "./HeadBar"
import TemporaryDrawer from "./Drawer"

class Layout extends React.Component<{ children: React.ReactNode[] }, { drawerOpen: boolean }> {
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
        render={data => (
          <>
            <TemporaryDrawer drawerOpen={this.state.drawerOpen}
                             onDrawerClose={() => this.setState({ ...this.state, drawerOpen: false })}/>
            <SearchAppBar siteMeta={data.site.siteMetadata}
                          onClickDrawerButton={() => this.setState({ ...this.state, drawerOpen: true })}/>
            <div style={{
                margin: `20px auto`,
                maxWidth: 960,
                padding: `0px 1.0875rem 1.45rem`,
                paddingTop: 0,
              }}
            >
              <main>{this.props.children}</main>
            </div>
          </>
        )}
      />
    )
  }

}


export default Layout
