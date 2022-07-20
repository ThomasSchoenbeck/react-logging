import ListItem from "@mui/material/ListItem"
import Tooltip from "@mui/material/Tooltip"
import Button from "@mui/material/Button"
import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react"
import { NavContext } from "../../context/navContext"
import ListItemText from "@mui/material/ListItemText"

interface Props {
  name: string
  route: string
  icon: JSX.Element
  open: boolean
}

export default function NavRoundButton(props: Props) {
  let navigate = useNavigate()
  const { activeRoute } = useContext(NavContext)

  return (
    <ListItem>
      <Tooltip title={!props.open ? props.name : ""} placement="right">
        <Button
          className={"sideNavButton " + (activeRoute[0] === props.route ? "Mui-selected" : "")}
          size="medium"
          variant="contained"
          disableElevation
          onClick={() => {
            console.log("props.name", props.name)
            navigate("/" + props.route)
          }}
        >
          {props.icon}
        </Button>
      </Tooltip>
      <ListItemText primary={props.name} sx={{ paddingLeft: "10px", opacity: props.open ? 1 : 0 }} />
    </ListItem>
  )
}
