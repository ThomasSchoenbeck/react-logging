import Paper from "@mui/material/Paper"
import Box from "@mui/material/Box"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { createPrefixGroup, loggingGroupProps } from "../loggingPrefixes"

const prefix = ["Feedback", "#112299", "#fff"]
const p = createPrefixGroup(prefix) as loggingGroupProps

const limit = 50

export default function Feedback() {
  const { appID } = useParams<{ appID: string }>()

  const [list, setList] = useState<feedback[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false)

  const [selectedFilter, setSelectedFilter] = useState<filter[]>([])

  const [pageNum, setPageNum] = useState<number>(1)

  function getFeedback(addRecords?: boolean) {
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
        console.error("error getting Feedback", e)
        setList([])
        setLoading(false)
      })
  }

  useEffect(() => {
    setPageNum(1)
  }, [selectedFilter])

  useEffect(() => {
    if (pageNum === 1) {
      console.log(...p.p, "getFeedback", pageNum)
      getFeedback()
    } else if (pageNum > 1) {
      console.log(...p.p, "getFeedback add", pageNum)
      getFeedback(true)
    }
  }, [pageNum])

  return (
    <div>
      <h3>Feedback</h3>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
        {list.map((e) => (
          <Paper key={"feedback-" + e.FEEDBACK_ID} sx={{ width: "50%" }}>
            <div>{e.FEEDBACK_ID}</div>
            <div>{e.FEEDBACK_TITLE}</div>
            <div>{e.FEEDBACK_MESSAGE}</div>
          </Paper>
        ))}
      </Box>
    </div>
  )
}
