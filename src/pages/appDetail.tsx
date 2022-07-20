import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function AppDetail() {
  let navigate = useNavigate()

  let { appID } = useParams<{ appID: string }>()

  const [app, setApp] = useState<apps | null>(null)

  function getAppByID(appID) {
    fetch("http://localhost:8080/apps/" + appID)
      .then((res) => res.json())
      .then((res) => {
        if (res !== null) {
          setApp(res)
        } else {
          setApp(null)
        }
      })
      .catch((e) => {
        console.log("error getting app details", e)
        setApp(null)
      })
  }

  useEffect(() => {
    console.log("we got appid", appID)
    if (appID && appID !== null && appID !== "") getAppByID(appID)
  }, [appID])

  useEffect(() => {
    console.log("mount app detail")
    return () => {
      console.log("unmount app detail")
    }
  }, [])

  return (
    <div>
      <h3>
        Application: <Chip color="primary" label={app?.APP_NAME} />
      </h3>
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
        <Button onClick={() => navigate("logs")}>Logs</Button>
        <Button onClick={() => navigate("feedback")}>Feedback</Button>
      </Box>
    </div>
  )
}
