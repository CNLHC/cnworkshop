require('source-map-support').install()
require('ts-node').register({ })

exports.createPages = ({
  graphql,
  actions
}) => {
  const InstallNodes = [
    require('./libs/nodes/postDeatil'),
  ]

  return Promise.all(InstallNodes.map(f => f({
    graphql,
    actions
  })))

}
