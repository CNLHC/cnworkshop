require('source-map-support').install()
require('ts-node').register({ })

exports.createPages = (args) => {
  const InstallNodes = [
    require('./src/libs/nodes/postView').default,
    require('./src/libs/nodes/tagview').default,
  ]

  return Promise.all(InstallNodes.map(f => f(args)))

}
