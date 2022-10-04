import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Paper from "@mui/material/Paper"
import CircularProgress from "@mui/material/CircularProgress"
import List from "@mui/material/List"
import AppCard from "../components/apps/appCard"

import AddIcon from "@mui/icons-material/Add"
import { useEffect, useState } from "react"
import { createPrefixGroup, loggingGroupProps } from "../loggingPrefixes"
import CreateAppDialog from "../components/apps/createAppDialog"
import { handleJsonResponse } from "../utilities/fetching"

// const apps: apps[] = [
//   {
//     APP_ID: "45845sdada",
//     APP_NAME: "Test",
//     APP_DESC: "",
//     // APP_LOGO: new Blob("https://picsum.photos/seed/picsum/200/300"),
//   },
// ]

const prefix = ["Apps", "#99ccbb"]
const p = createPrefixGroup(prefix) as loggingGroupProps

// const limit = 50

interface Props {
  limit: number
  title: string
}

export default function Apps(props: Props) {
  const [list, setList] = useState<apps[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false)
  const [error, setError] = useState<string>("")

  const [selectedFilter, setSelectedFilter] = useState<filter[]>([])

  const [pageNum, setPageNum] = useState<number>(1)

  function getApps(addRecords?: boolean) {
    fetch("http://localhost:8080/apps", {
      method: "POST",
      body: JSON.stringify({
        parameters: {
          currentPage: pageNum,
          limit: props.limit,
        },
        filters: selectedFilter,
      }),
    })
      .then(handleJsonResponse)
      .then((res: { data: apps[] }) => {
        if (res && res !== null && res.data !== null && res.data.length > 0) {
          // setList(res.data)
          setLoading(false)

          if (addRecords) {
            setList((prev) => [...prev, ...res.data])
          } else {
            // console.log(...p.pAS, "loaded logs", res.data.length)
            setList(res.data)
          }
          setError("")
        } else {
          setError("")
          setList([])
          setLoading(false)
        }
      })
      .catch((e) => {
        console.error("[error getting apps]", e)
        setError(e.error)
        setList([])
        setLoading(false)
      })
  }

  useEffect(() => {
    setPageNum(1)
  }, [selectedFilter])

  useEffect(() => {
    if (pageNum === 1) {
      console.log(...p.p, "getApps", pageNum)
      getApps()
    } else if (pageNum > 1) {
      console.log(...p.p, "getApps add", pageNum)
      getApps(true)
    }
  }, [pageNum])

  useEffect(() => {
    console.log("mount apps")
    return () => {
      console.log("unmount apps")
    }
  }, [])

  const [openCreateAppDialog, setOpenCreateAppDialog] = useState<boolean>(false)

  function handleOpenCreateAppDialog() {
    setOpenCreateAppDialog(true)
  }
  function handleCloseCreateAppDialog() {
    setOpenCreateAppDialog(false)
  }

  function handleCreateApp(appName: string) {
    fetch("http://localhost:8080/app", { method: "POST", body: JSON.stringify({ APP_NAME: appName }) })
      .then(handleJsonResponse)
      .then((res) => {
        console.log("handleCreateApp", res)
        if (res && res !== null) {
          const currentApps = [...list]
          currentApps.push(res.data)
          setList(currentApps)
        }
      })
      .catch((e) => {
        console.error("error creating app", e)
      })
  }

  return (
    <div>
      {/* <header className="App-header"> */}
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <h3>{props.title}</h3>
        <List>
          <Button disabled={error !== ""} color="primary" variant="contained" startIcon={<AddIcon />} onClick={handleOpenCreateAppDialog}>
            new
          </Button>
        </List>
      </Box>
      <Box sx={{ display: "flex", gap: 5 }}>
        {loading ? (
          <Box sx={{ width: "100%", height: "100px", display: "flex", alignItems: "center", justifyContent: "center", background: "none" }}>
            <CircularProgress />
          </Box>
        ) : error !== "" ? (
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ padding: "25px" }}>
              <Box sx={{ padding: "25px" }}>
                <Box>There is an error</Box>
                <Box sx={{ color: "#f22", fontWeight: "bold" }}>{error}</Box>
              </Box>
            </Paper>
          </Box>
        ) : (
          list.map((e) => <AppCard key={"app-" + e.APP_ID} id={e.APP_ID} name={e.APP_NAME} desc={e.APP_DESC} logo={e.APP_LOGO} />)
        )}
      </Box>
      <CreateAppDialog open={openCreateAppDialog} handleClose={handleCloseCreateAppDialog} handleCreate={handleCreateApp} />
    </div>
  )
}
