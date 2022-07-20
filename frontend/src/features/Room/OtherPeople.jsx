import React from "react"

const tmp = ["유저1", "유저2", "유저3", "유저4"]
const Video = ({ user }) => {
  return (
    <div className="border w-1/6 min-w-[200px] bg-white rounded-xl">{user}</div>
  )
}

export default function OtherPeople() {
  return (
    <div className=" h-1/6 flex w-full justify-between p-2 bg-lgBlue-400">
      {tmp.map((user, i) => (
        <Video user={user} key={i} />
      ))}
    </div>
  )
}
