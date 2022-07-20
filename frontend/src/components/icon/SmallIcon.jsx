import React from "react"

export default function Icon({ image }) {
  return (
    <div
      style={{
        width: "50px",
        height: "50px",
        borderRadius: "70%",
        backgroundImage: `url(${image})`,
      }}
      className="bg-cover"
    ></div>
  )
}
