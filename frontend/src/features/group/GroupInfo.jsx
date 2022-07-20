import React, { useState } from "react"
import Card from "../../components/card/Card"
import SmallIcon from "../../components/icon/SmallIcon"
import UserIcon from "../../components/icon/UserIcon"
import Button from "../../components/button/Button"

function GroupManagement() {
  const [isLeader, setIsLeader] = useState(false)
  return (
    <div>
      <Card size="100%">
        <div className="prose prose-slate">
          <h2>아직 운동 방이 만들어지지 않았어요!</h2>
          <p>여기를 클릭하여 운동 방을 만들어 보세요</p>
        </div>
        <div className="flex justify-evenly">
          <Button text="운동 루틴 관리" round="round3xl" />
          {/*
        그룹장 ->그룹 설정 및 관리 보임
        그룹원 -> 그룹 탈퇴 보임
        */}
          {isLeader ? (
            <Button text="그룹 설정 및 관리" round="round3xl" />
          ) : (
            <Button text="그룹 탈퇴" round="round3xl" />
          )}
        </div>
      </Card>
    </div>
  )
}

export default function GroupInfo({
  groupname,
  groupleader,
  groupPeopleNumber,
  groupExplanation,
}) {
  return (
    <div className="w-full flex justify-center mt-5">
      <Card size="middle">
        <div className="flex">
          <SmallIcon
            image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg"
            size="middle"
          />

          <div className="flex flex-col ml-10">
            <p className="text-xl">
              <strong>{groupname}</strong>
            </p>

            <div className="flex" style={{ fontSize: "11px" }}>
              <p>그룹장: {groupleader}</p>
              <p className="flex">
                <UserIcon />
                {groupPeopleNumber} / 10
              </p>
            </div>
          </div>
        </div>
        <hr />
        <p className="text-xs">{groupExplanation}</p>
      </Card>

      <GroupManagement />
    </div>
  )
}
