import React from "react"
import StreamComponent from "./openVidu/stream/StreamComponent"

const Video = ({ user, streamId }) => {
  return (
    <div className="w-full my-1 snap-start">
      <StreamComponent user={user} streamId={streamId} />
    </div>
  )
}

export default function OtherPeople({ subscribers }) {
  return (
    <div className=" h-full w-full flex flex-col items-center justify-center bg-white p-2    overflow-auto  rounded-2xl shadow-lg scrollbar-hide snap-y ">
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
