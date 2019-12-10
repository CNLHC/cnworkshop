/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it

// require("prismjs/themes/prism-twilight.css")
// require(`katex/dist/katex.min.css`)
// require("prismjs/themes/prism-tomorrow.css")

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

