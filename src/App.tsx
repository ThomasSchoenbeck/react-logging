import React, { useEffect, useState } from "react"
import "./App.css"
import { createPrefixGroup, loggingGroupProps } from "./loggingPrefixes"
import log from "loglevel"

const prefix = ["App", "#2FC7D1", "#000"]
const p = createPrefixGroup(prefix) as loggingGroupProps

function App() {
  const [list, setList] = useState<logs[]>([])
  const [newList, setNewList] = useState<logs[]>([])

  const [selectedFilter, setSelectedFilter] = useState<filter[]>([{ field: "SESSION_ID", value: "10c05976-d911-46b9-8914-e1b3049f708d" }])

  useEffect(() => {
    log.info(...p.pU, "App Component", "mounted", "🎁")
    log.trace(...p.p, "trace test")
    // getLogs()
  }, [])

  useEffect(() => {
    getLogs()
  }, [selectedFilter])

  useEffect(() => {
    if (list && list.length > 0) {
      const newList = list.map((l) => {
        // try {
        const jsonVar = JSON.parse(l.MSG)
        console.log("jsonVar", jsonVar)

        const colorBlocks = jsonVar[0].split("%c ")
        console.log("we have colorBlocks", colorBlocks.length, colorBlocks)

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

        console.log("arrays", { contentArray, cssArray, colorBlockArray })

        l.textBlock = []
        l.css = []
        l.contentBlock = []

        if (colorBlockArray.length === cssArray.length) {
          for (let i = 0; i < colorBlockArray.length; i++) {
            l.textBlock.push(colorBlockArray[i])

            const cssBlocks = cssArray[i].split("; ")
            const cssProps = {}
            cssBlocks.map((e) => {
              const cssStuff = e.split(": ")

              if (cssStuff[0] !== "") cssProps[cssStuff[0]] = cssStuff[1].replace(";", "")
            })

            l.css = cssProps
          }
        }
        l.contentBlock = contentArray

        return l
      })
      setNewList(newList)
    }
  }, [list])

  useEffect(() => {
    console.log("newList changed", newList)
  }, [newList])

  function getLogs() {
    fetch("http://localhost:8080/logs", {
      method: "POST",
      body: JSON.stringify({
        parameters: {
          currentPage: 1,
          limit: 15,
        },
        filters: selectedFilter,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.data.length > 0) {
          setList(res.data)
        } else {
          setList([])
        }
        console.log("res", res, res.data)
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
    <div className="App">
      <header className="App-header">
        <div style={{ width: "80%" }}>
          <h3>Log Window</h3>

          <div style={{ width: "100%", margin: "20px auto", height: 23, display: "flex", gap: 8, fontSize: "14px", justifyContent: "flex-start" }}>
            {selectedFilter.length > 0 &&
              selectedFilter.map((sf) => (
                <span style={{ background: "yellow", borderRadius: "3px 3px 3px 3px", padding: "2px", color: "black" }}>
                  {sf.field}: {sf.value}
                </span>
              ))}
          </div>

          <div style={{ border: "2px solid white", padding: 20, minWidth: "100%", width: "80%", margin: "0 auto" }}>
            {newList.map((e) => (
              <div style={{ textAlign: "left", fontSize: "12px", display: "flex", alignItems: "flex-start", marginBottom: 10 }}>
                <span style={{ flex: 1, maxWidth: "152px" }}>[{e.TIMESTAMP.toString()}]&nbsp;</span>
                <span style={{ flex: 1, maxWidth: "45px" }}>
                  <a href="#" className="logLevelLink" onClick={() => handleClick("LOG_LEVEL", e.LOG_LEVEL.toUpperCase())}>
                    {e.LOG_LEVEL.toUpperCase()}
                  </a>
                  :&nbsp;
                </span>
                <span style={{ flex: 1, maxWidth: "225px" }}>
                  <a href="#" className="logSessionIDLink" onClick={() => handleClick("SESSION_ID", e.SESSION_ID)}>
                    {e.SESSION_ID}
                  </a>
                  &nbsp;
                </span>
                <span style={{ flex: 1, display: "inline-block", alignItems: "center" }}>
                  {e.textBlock &&
                    e.textBlock.map((c, i: number) => (
                      <span className="colorBlock" style={e.css}>
                        {c}
                      </span>
                    ))}
                  {e.contentBlock &&
                    e.contentBlock.map((cb) => <span style={{ whiteSpace: "normal", wordBreak: "break-all" }}>{JSON.stringify(cb)}</span>)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ fontSize: "10px", textAlign: "left" }}>
          <table>
            <thead>
              <tr>
                <th style={{ width: 250 }}>Session ID</th>
                <th style={{ width: 250 }}>URL</th>
                <th style={{ width: 800 }}>Message</th>
                <th style={{ width: 50 }}>Client IP</th>
              </tr>
            </thead>
            <tbody>
              {newList.map((e) => (
                <tr>
                  <td>{e.SESSION_ID}</td>
                  <td>{e.URL}</td>
                  <td>{e.MSG}</td>
                  <td>{e.CLIENT_IP}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </header>
    </div>
  )
}

export default App
