import { graphql, StaticQuery } from "gatsby"
import React from "react"
import Styles from "./layout.module.scss"
import BlogSider from "./Sider"

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
          <div>
            <div className={Styles.blogContent}>
              <div className={Styles.sider}>
                <BlogSider/>
              </div>
              <main className={Styles.contentArea}>
                {this.props.children}
              </main>
            </div>
            <div className={Styles.blogFooter}>
              <div className={ Styles.footerText}>
              <span> Powered by React.js and GraphQL</span>
              <span> <a href={"http://www.beian.miit.gov.cn"}>京ICP备19023616号-1	</a>  </span>
              </div>
            </div>
          </div>
        )}
      />
    )
  }

}


export default Layout
