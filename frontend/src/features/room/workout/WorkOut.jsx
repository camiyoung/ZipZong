import React from "react"
import TeachableMachine from "../teachableMachine/TeachableMachine"
import Timer from "./Timer"

const type = "breaktime"
const WorkOut = ({ myVideo }) => {
  return (
    <div className="w-full h-full absolute">
      {/* <TeachableMachine myVideoRef={myVideo.props.myVideoRef} /> */}
      <Timer type={type} duration={10} />
    </div>
  )
}

export default WorkOut
