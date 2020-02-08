import conf from "../../conf"
import { PageCreator } from "./tagview"
import { PostForDetailView } from "./__generated__/PostForDetailView"


const DetailView: PageCreator = (props) => {
  const {
    createPage
  } = props.actions
  const graphql = (s: TemplateStringsArray) => props.graphql<PostForDetailView>(s.toString())
  const path = require('path')

  return new Promise((resolve, reject) => {
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql`query PostForDetailView{
            allMarkdownRemark(limit: 1000) {
              edges {
                node {
                  fileAbsolutePath
                  fields{
                    slug
                  }
                  frontmatter {
                    codeName
                  }
                }
              }
            }
        }`
        .then(result => {
          if (result.errors)
            reject(result.errors)


          const mdData = result.data.allMarkdownRemark.edges

          // Create detail view for each post
          mdData.forEach(({
            node
          }) => {
            const codeName = node.frontmatter.codeName
            const templatePath = path.resolve(`${__dirname}/../../templates/PostDetail/index.tsx`)
            createPage({
              path: node.fields.slug,
              component: templatePath,
              context: {
                codeName
              },
            })
          })
          // Create pagination index view
          const PostListConf = conf.PostList

          const {
            prefix,
            limit
          } = PostListConf
          const pages = Math.ceil(mdData.length / limit)
          const templatePath = path.resolve(`${__dirname}/../../templates/PostList/index.tsx`)

          Array.from({
            length: pages
          }).forEach((_, idx) => {
            if (idx === 0)
              createPage({
                path: `/${prefix}`,
                component: templatePath,
                context: {
                  limit,
                  offset: idx * limit
                }
              })

            createPage({
              path: `/${prefix}/${idx + 1}`,
              component: templatePath,
              context: {
                limit,
                offset: idx * limit
              }
            })
          })
        })
    )
  })
}
export default DetailView