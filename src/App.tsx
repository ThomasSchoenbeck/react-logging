import "./App.css"
import { createPrefixGroup, loggingGroupProps } from "./loggingPrefixes"

import PageWrapper from "./components/pageWrapper"
import { Box, CssBaseline, ThemeProvider } from "@mui/material"
import theme from "./integrations/muiTheme"

const prefix = ["App", "#2FC7D1", "#000"]
const p = createPrefixGroup(prefix) as loggingGroupProps

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PageWrapper />
      </ThemeProvider>
    </Box>
  )
}

export default App
