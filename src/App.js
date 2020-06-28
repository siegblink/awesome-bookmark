import React from 'react'
import { unstable_createMuiStrictModeTheme as createMuiTheme } from '@material-ui/core/styles'
import { ThemeProvider } from '@material-ui/core/styles'
import Main from './components/main/Main'

// By using the unstable_createMuiStrictModeTheme,
//   we are able to avoid the warning message
//   in the console that mentions a deprecated findDomNode
//   in React strict mode. This is for development purpose only.
// Once we move to production, we will replace
//   unstable_createMuiStrictModeTheme with its stable version.
const theme = createMuiTheme()

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Main />
    </ThemeProvider>
  )
}

export default App
