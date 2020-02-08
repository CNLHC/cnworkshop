require('source-map-support').install()
require('ts-node').register({ })

exports.createPages = ({
  graphql,
  actions
}) => {
  const InstallNodes = [
    require('./src/libs/nodes/postDeatil').default,
  ]

  return Promise.all(InstallNodes.map(f => f({
    graphql,
    actions
  })))

}
