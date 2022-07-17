import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles"
import MuiDrawer from "@mui/material/Drawer"
import List from "@mui/material/List"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes"
import AppsIcon from "@mui/icons-material/Apps"
import HomeIcon from "@mui/icons-material/Home"
import AlarmIcon from "@mui/icons-material/Alarm"
import { Button } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import NavButton from "./leftDrawer/navButton"
import { NavContext } from "../context/navContext"

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
})

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
})

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== "open" })(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}))

interface Props {
  open: boolean
  handleDrawerOpen: () => void
  handleDrawerClose: () => void
}

export default function LeftDrawer(props: Props) {
  const theme = useTheme()
  let navigate = useNavigate()
  // const [activeRoute, setActiveRoute] = useState<string>("")

  return (
    <Drawer variant="permanent" open={props.open} style={{ background: "darkgray" }}>
      <DrawerHeader>
        {props.open && <IconButton onClick={props.handleDrawerClose}>{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>}
        {!props.open && <IconButton onClick={props.handleDrawerOpen}>{theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>}
      </DrawerHeader>

      <NavContext.Consumer>
        {(value) => (
          <List sx={{ display: "flex", flexDirection: "column", height: "calc(100% - 128px)", justifyContent: "center" }}>
            <NavButton
              key={"navBtn-home"}
              name={"Home"}
              linkTo={"home"}
              icon={<HomeIcon />}
              open={props.open}
              activeRoute={value.activeRoute}
              setActiveRoute={value.setActiveRoute}
            />
            <NavButton
              key={"navBtn-apps"}
              name={"Applications"}
              linkTo={"apps"}
              icon={<AppsIcon />}
              open={props.open}
              activeRoute={value.activeRoute}
              setActiveRoute={value.setActiveRoute}
            />
            <NavButton
              key={"navBtn-logs"}
              name={"Logs"}
              linkTo={"logs"}
              icon={<SpeakerNotesIcon />}
              open={props.open}
              activeRoute={value.activeRoute}
              setActiveRoute={value.setActiveRoute}
            />
          </List>
        )}
      </NavContext.Consumer>
    </Drawer>
  )
}
