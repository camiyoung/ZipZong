import React from "react"
import CollectedIcons from "../features/group/CollectedIcons"
import GroupSetInfo from "../features/group/GroupSetInfo"
import GroupSetMemberList from "../features/group/GroupSetMemberList"
import Button from "../components/button/Button"

export default function GroupSet() {
  return (
    <div>
      <GroupSetInfo />
      <CollectedIcons />
      <GroupSetMemberList />
      <div className="mx-5 flex justify-end">
        <Button text="그룹 삭제" height="h-9" bgColor="bg-danger" />
      </div>
    </div>
  )
}
