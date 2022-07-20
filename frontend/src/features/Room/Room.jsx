import React from "react"
import InfoBar from "./InfoBar"
import MyExercise from "./MyExercise"
import OtherPeople from "./OtherPeople"

export default function Room() {
  return (
    <div className="flex flex-col h-full">
      <InfoBar />
      <MyExercise />
      <OtherPeople />
    </div>
  )
}
