import { useParams } from "react-router-dom"

export default function FeedbackChannel() {
  const { appID, channelID } = useParams<{ appID: string; channelID: string }>()

  return (
    <div>
      <h3>Feedback Channel: {channelID}</h3>
      <div></div>
    </div>
  )
}
