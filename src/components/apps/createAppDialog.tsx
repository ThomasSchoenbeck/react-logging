import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useState } from "react"

interface Props {
  open: boolean
  handleClose: () => void
  handleCreate: (v: string) => void
}

export default function (props: Props) {
  const [appName, setAppName] = useState<string>("")

  function handleClose() {
    setAppName("")
    props.handleClose()
  }

  function handleCreate() {
    props.handleCreate(appName)
    setAppName("")
    props.handleClose()
  }

  return (
    <Dialog open={props.open} onClose={props.handleClose} aria-labelledby="create-app-dialog-title" aria-describedby="create-app-dialog-description">
      <DialogTitle id="create-app-dialog-title">{"Create New App"}</DialogTitle>
      <DialogContent>
        <DialogContentText id="create-app-dialog-description">Set the name of the new app.</DialogContentText>

        <TextField
          autoFocus
          value={appName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAppName(event.target.value)
          }}
          margin="dense"
          id="app_name"
          label="App Name"
          type="text"
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleCreate} autoFocus>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  )
}
