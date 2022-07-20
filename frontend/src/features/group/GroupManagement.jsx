import React, { useState } from "react"
import Button from "../../components/button/Button"
import Card from "../../components/card/Card"

export default function GroupManagement() {
  const [isLeader, setIsLeader] = useState(false)
  return (
    <div>
      <Card size="100%">
        <div className="prose prose-slate">
          <h2>아직 운동 방이 만들어지지 않았어요!</h2>
          <p>여기를 클릭하여 운동 방을 만들어 보세요</p>
        </div>
      </Card>
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
    </div>
  )
}
