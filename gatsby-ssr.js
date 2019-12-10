/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

// You can delete this file if you're not using it

// require('source-map-support').install()
// require('ts-node').register({ })

// const RootWrapper = require("./src/pages/_provider")
// console.log(11111,RootWrapper)
// exports.wrapRootElement =  RootWrapper

const React = require("react")

const dark  = require('./src/theme/dark')
const ThemeProvider = require('@material-ui/styles').ThemeProvider

exports.wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={dark}>
      <div id="foo">
        {element}
      </div>
    </ThemeProvider>
  )
}
