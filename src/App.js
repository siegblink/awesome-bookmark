import React from 'react'
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import Main from './components/main/Main'

const theme = createMuiTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  )
}

export default App
