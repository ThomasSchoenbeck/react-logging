import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import { useState } from "react"

interface Props {
  appID: string
  open: boolean
  handleClose: () => void
  handleCreate: (v: string) => void
}

export default function FeedbackChannelDialog(props: Props) {
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
    <Dialog
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="create-feedback-channel-dialog-title"
      aria-describedby="create-feedback-channel-dialog-description"
    >
      <DialogTitle id="create-feedback-channel-dialog-title">
        {"Create New Feedback Channel for App"} {props.appID}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="create-feedback-channel-dialog-description">Set the name of the new Feedback Channel.</DialogContentText>

        <TextField
          autoFocus
          value={appName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAppName(event.target.value)
          }}
          margin="dense"
          id="channel_name"
          label="Feedback Channel Name"
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
