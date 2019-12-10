import React from "react"
import dark from './src/theme/dark'
import {ThemeProvider} from '@material-ui/styles'

export const wrapRootElement = ({ element }) => {
  return (
    <ThemeProvider theme={dark}>
        {element}
    </ThemeProvider>
  )
}
