import { Box, Container } from "@mui/material"
import AppCard from "../components/apps/appCard"
import NavStore from "../context/navContext"

const apps: apps[] = [
  {
    APP_ID: "45845sdada",
    APP_NAME: "Test",
    APP_DESC: "",
    // APP_LOGO: new Blob("https://picsum.photos/seed/picsum/200/300"),
  },
]

export default function Apps() {
  return (
    <div className="App-header">
      {/* <header className="App-header"> */}
      <Container>
        <h3>Applications</h3>
        <Box sx={{ display: "flex" }}>
          {apps.map((e) => (
            <AppCard key={"app-" + e.APP_ID} id={e.APP_ID} name={e.APP_NAME} desc={e.APP_DESC} logo={e.APP_LOGO} />
          ))}
        </Box>
      </Container>
    </div>
  )
}
