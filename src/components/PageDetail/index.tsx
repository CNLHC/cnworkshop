import React from "react"
import Layout from "../Layout/layout"
import { useTheme, Icon } from "@material-ui/core"
import useStyles, { FloatingArea, FloatingRail, PageRoot } from "./style"
import { MDXRenderer } from "gatsby-plugin-mdx"

import { PageContent } from "./style"
import { PageDetailByCodeName } from "../../templates/PostDetail/__generated__/PageDetailByCodeName"
import MdxToc from "./toc"

require(`katex/dist/katex.min.css`)
require("prismjs/themes/prism-tomorrow.css")

const PostDetail = (props: { data: PageDetailByCodeName }) => {
  const theme = useTheme()
  const styles = useStyles(theme)
  const { data } = props
  return (
    <Layout>
      <PageRoot>
        {/* <PageContent
          dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        /> */}
        <PageContent>

          <MDXRenderer title="My Stuff!">{props.data.mdx.body}</MDXRenderer>
        </PageContent>

        <FloatingRail>
          <FloatingArea>
            <MdxToc data={data.mdx.tableOfContents.items} />
          </FloatingArea>
        </FloatingRail>
      </PageRoot>
    </Layout>
  )
}

export default PostDetail
