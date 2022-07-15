import "./App.css"
import { createPrefixGroup, loggingGroupProps } from "./loggingPrefixes"

import PageWrapper from "./components/pageWrapper"
import { Box, CssBaseline } from "@mui/material"

const prefix = ["App", "#2FC7D1", "#000"]
const p = createPrefixGroup(prefix) as loggingGroupProps

function App() {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <PageWrapper />
    </Box>
  )
}

export default App
