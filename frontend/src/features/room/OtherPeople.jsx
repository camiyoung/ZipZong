import React from "react"
import StreamComponent from "./openVidu/stream/StreamComponent"

const Video = ({ user, streamId }) => {
  return (
    <div className="w-full my-1">
      <StreamComponent user={user} streamId={streamId} />
    </div>
  )
}

export default function OtherPeople({ subscribers }) {
  return (
    <div className=" h-full w-full flex flex-col items-center justify-center  p-2  overflow-auto ">
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
