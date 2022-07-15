import { CSSObject, styled, Theme, useTheme } from "@mui/material/styles"
import Box from "@mui/material/Box"
import MuiDrawer from "@mui/material/Drawer"
import CssBaseline from "@mui/material/CssBaseline"
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar"
import Toolbar from "@mui/material/Toolbar"
import List from "@mui/material/List"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft"
import ChevronRightIcon from "@mui/icons-material/ChevronRight"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import InboxIcon from "@mui/icons-material/MoveToInbox"
import MailIcon from "@mui/icons-material/Mail"
import SpeakerNotesIcon from "@mui/icons-material/SpeakerNotes"
import HomeIcon from "@mui/icons-material/Home"
import AlarmIcon from "@mui/icons-material/Alarm"
import { Button } from "@mui/material"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

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
  const [activeRoute, setActiveRoute] = useState<string>("")

  return (
    <Drawer variant="permanent" open={props.open} style={{ background: "darkgray" }}>
      <DrawerHeader>
        {props.open && (
          <IconButton onClick={props.handleDrawerClose}>{theme.direction === "rtl" ? <ChevronRightIcon /> : <ChevronLeftIcon />}</IconButton>
        )}
        {!props.open && (
          <IconButton onClick={props.handleDrawerOpen}>{theme.direction === "rtl" ? <ChevronLeftIcon /> : <ChevronRightIcon />}</IconButton>
        )}
      </DrawerHeader>

      <List>
        <ListItem key={"alarm"} disablePadding sx={{ justifyContent: "center" }}>
          <IconButton color="secondary" aria-label="add an alarm">
            <AlarmIcon />
          </IconButton>
        </ListItem>

        <ListItem key={"upload"} disablePadding sx={{ justifyContent: "center" }}>
          <Button variant={activeRoute === "upload" ? "contained" : "outlined"} component="label" onClick={() => setActiveRoute("upload")}>
            Upload
          </Button>
        </ListItem>

        <ListItem key={"home"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: props.open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={() => {
              setActiveRoute("home"), navigate("/")
            }}
            selected={activeRoute === "home"}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: props.open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} sx={{ opacity: props.open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"logs"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: props.open ? "initial" : "center",
              px: 2.5,
            }}
            onClick={() => {
              setActiveRoute("logs")
              navigate("/logs")
            }}
            selected={activeRoute === "logs"}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: props.open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <SpeakerNotesIcon />
            </ListItemIcon>
            <ListItemText primary={"Logs"} sx={{ opacity: props.open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        <ListItem key={"test"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              justifyContent: props.open ? "initial" : "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: props.open ? 3 : "auto",
                justifyContent: "center",
              }}
            >
              <AlarmIcon />
            </ListItemIcon>
            <ListItemText primary={"Alarm"} sx={{ opacity: props.open ? 1 : 0 }} />
          </ListItemButton>
        </ListItem>

        <Button
          color={"secondary"}
          variant={activeRoute === "test" ? "contained" : "text"}
          component="label"
          onClick={() => setActiveRoute("test")}
          style={{
            display: "flex",
            gap: 5,
            width: "calc(80% +1px)",
            color: "black",
            background: "white",
            marginLeft: "20%",
            borderRadius: 0,
            borderTopLeftRadius: 6,
            borderBottomLeftRadius: 6,
          }}
        >
          <span>
            <AlarmIcon />
          </span>
          <span>Alarm</span>
        </Button>
      </List>
    </Drawer>
  )
}
