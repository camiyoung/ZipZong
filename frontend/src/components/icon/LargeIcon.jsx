import React from "react"

export default function Icon({ image }) {
  return (
    <div
      style={{
        width: "100px",
        height: "100px",
        borderRadius: "70%",
        backgroundImage: `url(${image})`,
      }}
      className="bg-cover"
    ></div>
  )
}
