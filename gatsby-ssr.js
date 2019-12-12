import React from "react"
import dark from "./src/theme/dark"
import { ThemeProvider } from "@material-ui/styles"
import { ThemeProvider as StyledThemeProvider } from "styled-components"

export const wrapRootElement = ({ element }) => {
  return (
    <StyledThemeProvider theme={dark}>
      <ThemeProvider theme={dark}>{element}</ThemeProvider>
    </StyledThemeProvider>
  )
}
