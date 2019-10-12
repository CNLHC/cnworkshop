module.exports = ({
    graphql,
    actions
}) => {
    const {
        createPage
    } = actions
    const path = require('path')

    return new Promise((resolve, reject) => {
        // Query for markdown nodes to use in creating pages.
        resolve(
            graphql(`
          {
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
          }
        `)
            .then(result => {
                if (result.errors)
                    reject(result.errors)

                const mdData = result.data.allMarkdownRemark.edges


                // Create detail view for each post
                mdData.forEach(({
                    node
                }) => {
                    const codeName = node.frontmatter.codeName
                    const templatePath = path.resolve(`${__dirname}/../../src/templates/PostDetail/index.tsx`)

                    createPage({
                        path: node.fields.slug,
                        component: templatePath,
                        context: {
                            codeName
                        },
                    })
                })
                // Create pagination index view

                const limit = 3;
                const pages = Math.ceil(mdData.length / limit)
                const templatePath = path.resolve(`${__dirname}/../../src/templates/PostList/index.tsx`)

                Array.from({
                    length: pages
                }).forEach((_, idx) => {
                    createPage({
                            path: idx === 0 ?`/blog`:`/blog/${idx+1}`,
                            component: templatePath,
                            context:{
                              limit,
                              offset:idx*limit
                            }
                        }
                    )
                })











            })
        )
    })

}