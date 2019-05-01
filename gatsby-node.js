exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  const path = require('path')

  return new Promise((resolve, reject) => {
    // Query for markdown nodes to use in creating pages.
    resolve(
      graphql(
        `
          {
            allMarkdownRemark(limit: 1000) {
              edges {
                node {
                  fileAbsolutePath
                  frontmatter {
                    codeName
                  }
                }
              }
            }
          }
        `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }

        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
          const codeName= node.frontmatter.codeName
          const absPath = node.fileAbsolutePath
          categoryPrefix=path.dirname(path.relative(__dirname,absPath))
          createPage({
            path:categoryPrefix+`/${codeName}`,
            component:__dirname+`/src/templates/blogPostTemplate.tsx`,
            context: {
              codeName
            },
          })
        })
      })
    )
  })
}