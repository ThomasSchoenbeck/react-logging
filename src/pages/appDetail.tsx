import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

export default function AppDetail() {
  let { appID } = useParams<{ appID: string }>()

  const [app, setApp] = useState<apps | null>(null)

  function getAppByID(appID) {
    fetch("http://localhost:8080/app/" + appID)
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
      appdetail
      <h3>{app?.APP_NAME}</h3>
    </div>
  )
}
