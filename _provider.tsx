import React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import dark from '../theme/dark'

function RootProvider({children}){
    return (
    <>
        <ThemeProvider theme={dark}>
            {children}
        </ThemeProvider>
    </>
    )

}

const RootWrapper=({ element }) => <RootProvider>{element}</RootProvider>;

module.exports=RootWrapper

