import { styled } from "@mui/material/styles"

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import { NavContext } from "../context/navContext"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import { Link } from "react-router-dom"

import "./topAppBar.css"
import { useContext, useEffect, useState } from "react"

const drawerWidth = 240

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
//   open?: boolean
// }>(({ theme, open }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   transition: theme.transitions.create("margin", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: `-${drawerWidth}px`,
//   ...(open && {
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 0,
//   }),
// }))

interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer - 1,
  background: "#1c1f24",
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

interface Props {
  open: boolean
  handleDrawerOpen: () => void
}

export default function TopAppBar(props: Props) {
  const { activeRoute } = useContext(NavContext)

  function routeToName(route: string) {
    if (route === "apps") route = "Applications"
    if (route === "logs") route = "Logs"
    if (route === "feedback") route = "Feedback"
    if (route === "emails") route = "Email Templates"

    return route
  }

  function breadcrumb(i: number, value, e: string) {
    if (i < value.length - 1) {
      return (
        <Link key={"routeLink-" + e} to={value.slice(0, i).join("/") + "/" + e}>
          <Typography variant="h6" noWrap component="div">
            {routeToName(e)}
          </Typography>
        </Link>
      )
    } else {
      return (
        <span key={"routeLink-" + e} style={{ color: "lightblue" }}>
          {routeToName(e)}
        </span>
      )
    }
  }

  return (
    <AppBar position="fixed" open={props.open}>
      <Toolbar sx={{ marginLeft: 12 }}>
        {activeRoute && <Breadcrumbs aria-label="breadcrumb">{activeRoute.map((e, i) => breadcrumb(i, activeRoute, e))}</Breadcrumbs>}
        {/* <NavContext.Consumer>
          {(value) => <Breadcrumbs aria-label="breadcrumb">{value.activeRoute.map((e, i) => breadcrumb(i, value, e))}</Breadcrumbs>}
        </NavContext.Consumer> */}
      </Toolbar>
    </AppBar>
  )
}
