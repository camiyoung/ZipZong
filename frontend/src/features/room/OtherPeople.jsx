import React from "react"
import StreamComponent from "./openVidu/stream/StreamComponent"

const tmp = ["유저1", "유저2", "유저3", "유저4"]
const Video = ({ user, streamId }) => {
  return (
    <div className="border w-1/6 min-w-[200px] bg-white rounded-xl">
      <StreamComponent user={user} streamId={streamId} />
    </div>
  )
}

export default function OtherPeople({ subscribers }) {
  return (
    <div className=" h-1/6 flex w-full justify-between p-2 bg-lgBlue-400">
      {subscribers.map((sub, i) => (
        <Video
          user={sub}
          key={i}
          streamId={sub.streamManager.stream.streamId}
        />
      ))}
    </div>
  )
}
