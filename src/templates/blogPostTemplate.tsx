import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
import Styles from "./blogPost.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

require(`katex/dist/katex.min.css`)
require("prismjs/themes/prism-tomorrow.css")


const PostPage = ({ data }) => (
  <Layout>
    <div className={Styles.pageContent}>
      <div
        dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
        className={Styles.content}
      />
        <div style={{
          position: "relative",
        }}>
          <div
            dangerouslySetInnerHTML={{ __html: data.markdownRemark.tableOfContents }}
            className={Styles.toc}
          >
          </div>
          <div className={Styles.returnButton}>
            <Link to="/"

            >
              <FontAwesomeIcon icon={faArrowLeft}
                               style={{
                                 fontSize: "48px",
                               }}
              />
            </Link>
        </div>
      </div>
    </div>
  </Layout>)

export const query = graphql`
    query($codeName: String!) {
        markdownRemark(frontmatter: { codeName: { eq: $codeName} }) {
            html
            tableOfContents(pathToSlugField: "fields.slug", heading: null, maxDepth: 4)
        }
    }
`
export default PostPage

