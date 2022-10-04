import Card from "@mui/material/Card"
import CardContent from "@mui/material/CardContent"
import CardMedia from "@mui/material/CardMedia"
import Typography from "@mui/material/Typography"
import { CardActionArea } from "@mui/material"
import { Link, useNavigate } from "react-router-dom"
import { NavContext } from "../../context/navContext"
import { useContext, useEffect } from "react"

interface Props {
  id: string
  name: string
  desc: string | null
  logo?: File
}

export default function AppCard(props: Props) {
  let navigate = useNavigate()

  return (
    <Card key={props.id} sx={{ maxWidth: 345 }}>
      <NavContext.Consumer>
        {(value) => (
          <CardActionArea
            onClick={() => {
              navigate(props.id)
            }}
          >
            {props.logo ? (
              <CardMedia component="img" height="140" image={URL.createObjectURL(props.logo)} alt="logo" />
            ) : (
              <CardMedia component="img" height="140" image={"https://picsum.photos/seed/picsum/180/140"} alt="logo" />
            )}
            {/* <CardMedia component="img" width="180" height="140" image={props.logo ? URL.createObjectURL(props.logo) : undefined} alt="logo" /> */}
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {props.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.desc} {props.id}
              </Typography>
            </CardContent>
          </CardActionArea>
        )}
      </NavContext.Consumer>
    </Card>
  )
}
