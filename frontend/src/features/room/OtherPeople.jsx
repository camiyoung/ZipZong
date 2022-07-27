import React from "react"
import StreamComponent from "./openVidu/stream/StreamComponent"

const tmp = ["유저1", "유저2", "유저3", "유저4"]
const Video = ({ user, streamId }) => {
  return (
    <div className="w-full   my-2">
      <StreamComponent user={user} streamId={streamId} />
    </div>
  )
}

export default function OtherPeople({ subscribers }) {
  return (
    <div className=" h-full w-1/6 flex flex-col items-center justify-center  pl-5 ">
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
