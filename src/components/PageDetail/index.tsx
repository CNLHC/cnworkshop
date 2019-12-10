import React from "react"
import Layout from "../Layout/layout"
import { Icon } from "semantic-ui-react"
import { useTheme } from "@material-ui/core"
import useStyles, { FloatingArea, FloatingRail, PageRoot } from "./style"
import { IQuery } from "../../templates/PostDetail/query"
import { PageContent } from "./style"

require(`katex/dist/katex.min.css`)
require("prismjs/themes/prism-tomorrow.css")

const PostDetail = (props: { data: IQuery }) => {
  const theme = useTheme()
  const styles = useStyles(theme)
  const data = props.data
  return (
    <Layout>
      <PageRoot>
        <PageContent
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        />
        <FloatingRail>
          <FloatingArea>
            <div
              dangerouslySetInnerHTML={{
                __html: data.markdownRemark.tableOfContents,
              }}
              className={styles.toc}
            />
            <div>
              <Icon
                name={"arrow left"}
                onClick={() => window.history.back()}
                size={"huge"}
              />
            </div>
          </FloatingArea>
        </FloatingRail>
      </PageRoot>
    </Layout>
  )
}

export default PostDetail
