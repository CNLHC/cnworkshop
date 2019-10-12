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