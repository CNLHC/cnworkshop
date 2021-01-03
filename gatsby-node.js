require('source-map-support').install()
require('ts-node').register({})

exports.createPages = (args) => {
  const InstallNodes = [
    require('./src/libs/nodes/postView').default,
    require('./src/libs/nodes/tagview').default,
  ]

  return Promise.all(InstallNodes.map(f => f(args)))

}
const { createFilePath } = require("gatsby-source-filesystem")
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  // you only want to operate on `Mdx` nodes. If you had content from a
  // remote CMS you could also check to see if the parent node was a
  // `File` node here
  if (node.internal.type === "Mdx") {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: "slug",
      node,
      value: `${value}`,
    })
  }
}
