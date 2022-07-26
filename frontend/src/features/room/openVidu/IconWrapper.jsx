import React from "react"

export default function IconWrapper({ handler, isActive = true, children }) {
  const iconClasses = children.props.className + " w-full h-full"
  const color = isActive ? "bg-primary-700" : "bg-red-500"

  return (
    <div
      className={` w-14 h-14 p-4 m-1 rounded-full ${color}`}
      onClick={handler}
    >
      {React.cloneElement(children, { className: iconClasses })}
      {/* {children} */}
    </div>
  )
}
