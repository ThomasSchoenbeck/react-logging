import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom"
import { createPrefixGroup, loggingGroupProps } from "../loggingPrefixes"
import List from "@mui/material/List"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"
import AddIcon from "@mui/icons-material/Add"
import CreateFeedbackChannelDialog from "../components/feedback/createFeedbackChannelDialog"

const prefix = ["Feedback", "#112299", "#fff"]
const p = createPrefixGroup(prefix) as loggingGroupProps

const limit = 50

export default function Feedback() {
  const { appID } = useParams<{ appID: string }>()

  let navigate = useNavigate()

  const [list, setList] = useState<feedbackChannel[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false)

  const [selectedFilter, setSelectedFilter] = useState<filter[]>([])

  const [pageNum, setPageNum] = useState<number>(1)

  function getFeedbackChannels(addRecords?: boolean) {
    fetch("http://localhost:8080/feedback/" + appID, {
      method: "POST",
      body: JSON.stringify({
        parameters: {
          currentPage: pageNum,
          limit: limit,
        },
        filters: selectedFilter,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res && res !== null && res.data !== null && res.data.length > 0) {
          setList(res.data)
          setLoading(false)

          if (addRecords) {
            setList((prev) => [...prev, ...res.data])
          } else {
            // console.log(...p.pAS, "loaded logs", res.data.length)
            setList(res.data)
          }
        } else {
          setList([])
          setLoading(false)
        }
      })
      .catch((e) => {
        console.error("error getting Feedback channels", e)
        setList([])
        setLoading(false)
      })
  }

  useEffect(() => {
    setPageNum(1)
  }, [selectedFilter])

  useEffect(() => {
    if (pageNum === 1) {
      console.log(...p.p, "getFeedbackChannels", pageNum)
      getFeedbackChannels()
    } else if (pageNum > 1) {
      console.log(...p.p, "getFeedbackChannels add", pageNum)
      getFeedbackChannels(true)
    }
  }, [pageNum])

  // dialog
  const [openCreateFeedbackChannelDialog, setOpenCreateFeedbackChannelDialog] = useState<boolean>(false)

  function handleOpenCreateFeedbackChannelDialog() {
    setOpenCreateFeedbackChannelDialog(true)
  }
  function handleCloseCreateFeedbackChannelDialog() {
    setOpenCreateFeedbackChannelDialog(false)
  }

  function handleCreateFeedbackChannel(channelName: string) {
    fetch("http://localhost:8080/feedback/" + appID + "/create", { method: "POST", body: JSON.stringify({ CHANNEL_NAME: channelName }) })
      .then((res) => res.json())
      .then((res) => {
        console.log("handleCreateFeedbackChannel", res)
        if (res && res !== null) {
          const currentFeedbackChannels = [...list]
          currentFeedbackChannels.push(res)
          setList(currentFeedbackChannels)
        }
      })
      .catch((e) => {
        console.error("error creating feedback channel for app", appID, e)
      })
  }

  return (
    <div>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3>Feedback Channels</h3>
        <List>
          <Button color="primary" variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreateFeedbackChannelDialog}>
            new
          </Button>
        </List>
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2, textAlign: "left" }}>
        {loading && <CircularProgress />}
        <Box sx={{ width: "100%", padding: "10px 20px", display: "flex", gap: 2 }}>
          <div style={{ width: "10%" }}>APP_ID</div>
          <div style={{ width: "10%" }}>CHANNEL_ID</div>
          <div style={{ width: "20%" }}>CHANNEL_NAME</div>
          <div style={{ width: "30%" }}>CHANNEL_DESC</div>
          <div style={{ width: "30%" }}>CHANNEL_ENDPOINT</div>
        </Box>
        {list.map((e) => (
          <Paper
            key={"feedback-" + e.CHANNEL_ID}
            sx={{ width: "100%", padding: "20px", display: "flex", gap: 2 }}
            onClick={() => {
              console.log("navigate to", e.CHANNEL_ID)
              navigate("" + e.CHANNEL_ID)
            }}
          >
            <div style={{ width: "10%" }}>{e.APP_ID}</div>
            <div style={{ width: "10%" }}>{e.CHANNEL_ID}</div>
            <div style={{ width: "20%" }}>{e.CHANNEL_NAME}</div>
            <div style={{ width: "30%" }}>{e.CHANNEL_DESC}</div>
            <div style={{ width: "30%" }}>{e.CHANNEL_ENDPOINT}</div>
          </Paper>
        ))}
      </Box>
      {appID && (
        <CreateFeedbackChannelDialog
          appID={appID}
          open={openCreateFeedbackChannelDialog}
          handleClose={handleCloseCreateFeedbackChannelDialog}
          handleCreate={handleCreateFeedbackChannel}
        />
      )}
    </div>
  )
}
