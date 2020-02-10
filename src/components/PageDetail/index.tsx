import React from "react"
import Layout from "../Layout/layout"
import { useTheme, Icon } from "@material-ui/core"
import useStyles, { FloatingArea, FloatingRail, PageRoot } from "./style"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { MDXProvider } from "@mdx-js/react"

import { PageContent } from "./style"
import { PageDetailByCodeName } from "../../templates/PostDetail/__generated__/PageDetailByCodeName"

import MdxToc from "./toc"

require(`katex/dist/katex.min.css`)
require("prismjs/themes/prism-tomorrow.css")

const PostDetail = (props: { data: PageDetailByCodeName }) => {
  const theme = useTheme()
  const styles = useStyles(theme)
  const { data } = props
const shortcodes = { }
  return (
    <Layout>
      <PageRoot>
        <MDXProvider components={shortcodes}>
          <PageContent>
            <MDXRenderer title="My Stuff!">{props.data.mdx.body}</MDXRenderer>
          </PageContent>
        </MDXProvider>

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
