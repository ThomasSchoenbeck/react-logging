import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemIcon from "@mui/material/ListItemIcon"
import ListItemText from "@mui/material/ListItemText"
import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { NavContext } from "../../context/navContext"

interface Props {
  open: boolean
  name: string
  linkTo: string
  icon: JSX.Element
}

export default function NavButton(props: Props) {
  let navigate = useNavigate()

  const { activeRoute } = useContext(NavContext)

  useEffect(() => {
    console.log("mount NavButton")
    return () => {
      console.log("unmount NavButton")
    }
  }, [])

  return (
    <ListItem disablePadding sx={{ display: "block" }} className="mainNavButton">
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: props.open ? "initial" : "center",
          px: 4.5,
        }}
        onClick={() => {
          console.log("props.name", props.name)
          navigate("/" + props.linkTo)
        }}
        selected={activeRoute[0] === props.linkTo}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: props.open ? 3 : "auto",
            justifyContent: "center",
            color: "white",
          }}
        >
          {props.icon}
          {/* <HomeIcon /> */}
        </ListItemIcon>
        <ListItemText primary={props.name} sx={{ opacity: props.open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  )
}
