import { Box, Button, Container, List } from "@mui/material"
import AppCard from "../components/apps/appCard"
import NavStore from "../context/navContext"

import AddIcon from "@mui/icons-material/Add"

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
    <div>
      {/* <header className="App-header"> */}
      <Container>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <h3>Applications</h3>
          <List>
            <Button color="primary" variant="contained" startIcon={<AddIcon />}>
              new
            </Button>
          </List>
        </Box>
        <Box sx={{ display: "flex" }}>
          {apps.map((e) => (
            <AppCard key={"app-" + e.APP_ID} id={e.APP_ID} name={e.APP_NAME} desc={e.APP_DESC} logo={e.APP_LOGO} />
          ))}
        </Box>
      </Container>
    </div>
  )
}
