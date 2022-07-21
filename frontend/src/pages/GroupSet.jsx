import React from "react"
import CollectedIcons from "../features/group/CollectedIcons"
import GroupSetInfo from "../features/group/GroupSetInfo"
import GroupSetMemberList from "../features/group/GroupSetMemberList"
export default function GroupSet() {
  return (
    <div>
      <GroupSetInfo />
      <CollectedIcons />
      <GroupSetMemberList />
    </div>
  )
}
