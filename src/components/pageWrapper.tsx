import { useState } from "react"
import LeftDrawer from "./leftDrawer"
import TopAppBar from "./TopAppBar"
import { styled } from "@mui/material/styles"

import { Routes, Route } from "react-router-dom"
import Logs from "../pages/logs"
import { Box, Container } from "@mui/material"
import Apps from "../pages/apps"
import NavStore from "../context/navContext"
import Home from "../pages/home"

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

export default function PageWrapper() {
  const [open, setOpen] = useState(false)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  return (
    <NavStore>
      <Box sx={{ display: "flex", flexGrow: 1 }}>
        <TopAppBar open={open} handleDrawerOpen={handleDrawerOpen} />
        <LeftDrawer open={open} handleDrawerOpen={handleDrawerOpen} handleDrawerClose={handleDrawerClose} />
        <Box component="main" sx={{ flexGrow: 1 }} className="App">
          <DrawerHeader />
          <div className="App">
            <Container>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/apps" element={<Apps />} />
                <Route path="/logs" element={<Logs />} />
              </Routes>
            </Container>
          </div>
        </Box>
      </Box>
    </NavStore>
  )
}
