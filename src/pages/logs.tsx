import React, { useCallback, useEffect, useRef, useState } from "react"
import { createPrefixGroup, loggingGroupProps } from "../loggingPrefixes"
import log from "loglevel"
import Expander from "../components/expander"
import FlexTest from "../components/flexTest"
import { CircularProgress, Container } from "@mui/material"
import InfiniteScroll from "react-infinite-scroll-component"

const prefix = ["Logs", "#75AB44"]
const p = createPrefixGroup(prefix) as loggingGroupProps

const limit = 50

export default function Logs() {
  const [list, setList] = useState<logs[]>([])
  const [newList, setNewList] = useState<logs[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [hasMore, setHasMore] = useState<boolean>(false)

  const [selectedFilter, setSelectedFilter] = useState<filter[]>([])

  const [pageNum, setPageNum] = useState<number>(1)

  useEffect(() => {
    console.log(...p.p, "mount")

    return () => {
      console.log(...p.p, "unmount")
    }
  }, [])
  useEffect(() => {
    setPageNum(1)
  }, [selectedFilter])

  useEffect(() => {
    if (list && list.length > 0) {
      const newList = list.map((l) => {
        // try {
        const jsonVar = JSON.parse(l.MSG)

        const colorBlocks = jsonVar[0].split("%c ")
        // console.log("🍟🍟🍔🍕", jsonVar, colorBlocks)
        const contentArray: any[] = []
        const cssArray: string[] = []
        let colorBlockArray: string[] = []
        jsonVar.map((e) => {
          if (typeof e === "string") {
            if (e.includes("display: inline-block")) cssArray.push(e)
            else if (e.includes("%c")) colorBlockArray.push(...e.split("%c "))
            else if (e !== "") contentArray.push(e)
          }

          if (e.isArray || typeof e === "object") contentArray.push(e)
        })

        colorBlockArray = colorBlockArray.map((e) => e.replaceAll("%c", ""))

        l.textBlock = []
        l.cssBlock = []
        l.contentBlock = []
        // console.log("arrays", { colorBlockArray, cssArray, contentArray })

        if (colorBlockArray.length === cssArray.length) {
          for (let i = 0; i < colorBlockArray.length; i++) {
            l.textBlock.push(colorBlockArray[i])

            const cssBlocks = cssArray[i].split("; ")
            const cssProps = {}
            cssBlocks.map((e) => {
              const cssStuff = e.split(": ")

              if (cssStuff[0] !== "") cssProps[cssStuff[0]] = cssStuff[1].replace(";", "")
            })

            l.cssBlock.push(cssProps)
          }
        }
        l.contentBlock = contentArray

        return l
      })
      setLoading(false)
      setNewList(newList)
    }
  }, [list])

  useEffect(() => {
    if (pageNum === 1) {
      console.log(...p.p, "getLogs", pageNum)
      getLogs()
    } else if (pageNum > 1) {
      console.log(...p.p, "getLogs add", pageNum)
      getLogs(true)
    }
  }, [pageNum])

  function getLogs(addLogs?: boolean) {
    setLoading(true)
    fetch("http://localhost:8080/logs", {
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
        if (res.data.length > 0) {
          // log.debug(...p.pAS, "loaded logs", res.data.length)

          if (limit * pageNum < res.numFilteredRecords) {
            console.log("we still have more", { "limit*pageNum": limit * pageNum, numFilteredRecords: res.numFilteredRecords })
            setHasMore(true)
          } else {
            console.log("we are out", { "limit*pageNum": limit * pageNum, numFilteredRecords: res.numFilteredRecords })
            setHasMore(false)
          }

          if (addLogs) {
            setList((prev) => [...prev, ...res.data])
          } else {
            // console.log(...p.pAS, "loaded logs", res.data.length)
            setList(res.data)
          }
          // setLoading(false)
        } else {
          // log.debug(...p.pAE, "logs loaded, list empty", res.data.length)
          if (addLogs) {
            setLoading(false)
          } else {
            setList([])
          }
          // setLoading(false)
        }
        // console.log("res", res, res.data)
      })
      .catch((e) => {
        // log.error(...p.pAF, "error loading logs", e)

        if (addLogs) {
          setLoading(false)
        } else {
          setList([])
        }
      })
  }

  function handleClick(field, value) {
    const newSelectedFilter = [...selectedFilter]

    const index = newSelectedFilter.findIndex((el) => el.field === field)
    console.log("index", index)
    if (index === -1) {
      newSelectedFilter.push({ field, value })
    } else {
      if (newSelectedFilter[index].value !== value) newSelectedFilter[index] = { field, value }
      else newSelectedFilter.splice(index, 1)
    }

    setSelectedFilter(newSelectedFilter)
  }

  return (
    <div className="App-header">
      {/* <header className="App-header"> */}
      <Container>
        <h3>Log Window</h3>

        {/* <FlexTest /> */}

        <div
          style={{
            width: "100%",
            margin: "20px auto",
            height: 23,
            display: "flex",
            gap: 8,
            fontSize: "14px",
            justifyContent: "flex-start",
          }}
        >
          {selectedFilter.length > 0 &&
            selectedFilter.map((sf) => (
              <span style={{ background: "yellow", borderRadius: "3px 3px 3px 3px", padding: "2px", color: "black" }}>
                {sf.field}: {sf.value}
              </span>
            ))}
        </div>

        <div style={{ border: "2px solid white", padding: 20, minWidth: "100%", width: "80%", margin: "0 auto" }}>
          <InfiniteScroll
            dataLength={newList.length} //This is important field to render the next data
            next={() => setPageNum(pageNum + 1)}
            hasMore={hasMore}
            loader={
              <div style={{ display: "flex", justifyContent: "center", margin: 50 }}>
                <CircularProgress />
              </div>
            }
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
          >
            {newList.map((e, i) => (
              <div
                key={i + e.LOG_ID + "-log"}
                style={{
                  textAlign: "left",
                  fontSize: "12px",
                  width: "100%",
                  // display: "inline-block",
                  display: "flex",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  marginBottom: 10,
                }}
              >
                <span key={e.LOG_ID + "-logid"} style={{ flex: 1, maxWidth: "45px" }}>
                  [{e.LOG_ID}]
                </span>
                <span key={e.LOG_ID + "-timestamp"} style={{ flex: 1, maxWidth: "165px" }}>
                  [{e.TIMESTAMP.toString()}]&nbsp;
                </span>
                <span key={e.LOG_ID + "-loglevel"} style={{ flex: 1, maxWidth: "50px" }}>
                  <a href="#" className="logLevelLink" onClick={() => handleClick("LOG_LEVEL", e.LOG_LEVEL.toUpperCase())}>
                    {e.LOG_LEVEL.toUpperCase()}
                  </a>
                  :&nbsp;
                </span>
                <span key={e.LOG_ID + "-session_id"} style={{ flex: 1, maxWidth: "250px" }}>
                  <a href="#" className="logSessionIDLink" onClick={() => handleClick("SESSION_ID", e.SESSION_ID)}>
                    {e.SESSION_ID}
                  </a>
                  &nbsp;
                </span>
                {/* <span key={e.LOG_ID + "-textblock"} style={{ flex: 1, display: "flex", gap: 5, alignItems: "flex-start" }}> */}
                <>
                  {e.textBlock &&
                    e.textBlock.map((c, i: number) => (
                      <span className="colorBlock" style={e.cssBlock ? e.cssBlock[i] : undefined}>
                        {c}
                      </span>
                    ))}
                  {e.contentBlock &&
                    e.contentBlock.map((cb) => {
                      // console.log("content block is", Array.isArray(cb), typeof cb, cb);

                      if (Array.isArray(cb)) {
                        return <Expander state={JSON.stringify(cb)} />
                        return (
                          <span style={{ whiteSpace: "normal", wordBreak: "break-all" }}>
                            <span style={{ color: "orange", fontWeight: "bold" }}>Array</span>: {JSON.stringify(cb)}
                          </span>
                        )
                      } else if (typeof cb === "object") {
                        return <Expander state={JSON.stringify(cb)} />
                        return (
                          <span style={{ whiteSpace: "normal", wordBreak: "break-all" }}>
                            <span style={{ color: "pink", fontWeight: "bold" }}>Object</span>: {JSON.stringify(cb)}
                          </span>
                        )
                      }
                      return <span style={{ whiteSpace: "normal", wordBreak: "break-all" }}>{JSON.stringify(cb)}</span>
                    })}
                </>
                {/* </span> */}
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </Container>
      {/* </header> */}
    </div>
  )
}
