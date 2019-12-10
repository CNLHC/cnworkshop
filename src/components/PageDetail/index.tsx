import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../../components/layout"
import { Icon } from "semantic-ui-react"
import { useTheme } from "@material-ui/core"
import useStyles from "./style"
import { IQuery } from "../../templates/PostDetail/query"


require(`katex/dist/katex.min.css`)
require("prismjs/themes/prism-tomorrow.css")



const  PostDetail= (props:{ data :IQuery}) => {
  const theme = useTheme()
  const styles = useStyles(theme)
  const data = props.data
  return (<Layout>
    <div className={styles.pageContent}>
      <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }} className={styles.content} />
      <div style={{
        position: "relative",
      }}>
        <div dangerouslySetInnerHTML={{ __html: data.markdownRemark.tableOfContents }} className={styles.toc}>
        </div>
        <div className={styles.returnButton}>
          {/* <ClickableIcon> */}
            <Icon name={"arrow left"} onClick={() => window.history.back()} size={"huge"} />
          {/* </ClickableIcon> */}
        </div>
      </div>
    </div>
  </Layout>);
}

export default PostDetail

