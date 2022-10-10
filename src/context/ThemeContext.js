import { createTheme } from '@mui/material'
import React, { createContext, useMemo, useState } from 'react'
import { getDesignTokens } from '../theme'

const initialState = {
    toggleMode:()=>{}
}
const ModeContext = createContext(initialState)




const ThemeContextProvider = (props) => {
    const[mode,setMode] = useState("dark");
    const colorMode = useMemo(() => ({
          toggleColorMode: () => {
            setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
          }}),[])
    const theme = useMemo(() => createTheme(getDesignTokens(mode)),[mode])
  return (
    <ModeContext.Provider value={{mode,setMode,colorMode,theme}}>
        {props.children}
    </ModeContext.Provider>
  )
}

export {ModeContext,ThemeContextProvider}

