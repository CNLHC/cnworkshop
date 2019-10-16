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

const path = require("path");

exports.onCreateWebpackConfig = ({ actions }) => {   
  actions.setWebpackConfig({
   resolve: {
    alias: { "../../theme.config$": path.join(__dirname,  "src/semantic/theme.config")}
   }
  });
 };