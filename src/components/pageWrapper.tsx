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
import AppDetail from "../pages/appDetail"
import Feedback from "../pages/feedback"
import FeedbackChannel from "../pages/feedbackChannel"

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
                <Route path="/home" element={<Home />} />
                <Route path="/apps" element={<Apps title={"Applications"} limit={50} />} />
                <Route path="/apps/:appID" element={<AppDetail />} />
                <Route path="/apps/:appID/logs" element={<Logs />} />
                <Route path="/apps/:appID/feedback" element={<Feedback />} />
                <Route path="/logs" element={<Apps title={"Logs of Applications"} limit={50} />} />
                <Route path="/logs/:appID" element={<Logs />} />
                <Route path="/feedback" element={<Apps title={"Feedback of Applications"} limit={50} />} />
                <Route path="/feedback/:appID" element={<Feedback />} />
                <Route path="/feedback/:appID/:channelID" element={<FeedbackChannel />} />
              </Routes>
            </Container>
          </div>
        </Box>
      </Box>
    </NavStore>
  )
}
