import React from "react"
import Card from "../../components/card/Card"
import SmallIcon from "../../components/icon/SmallIcon"
import UserIcon from "../../components/icon/UserIcon"

export default function GroupInfo({
  groupname,
  groupleader,
  groupPeopleNumber,
  groupExplanation,
}) {
  return (
    <div>
      <Card size="large">
        <div className="flex">
          <SmallIcon image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg" />

          <div className="flex flex-col ml-10">
            <p className="text-xl">
              <strong>{groupname}</strong>
            </p>

            <div className="flex">
              <p>그룹장: {groupleader}</p>
              <p className="flex">
                <UserIcon />
                {groupPeopleNumber} / 10
              </p>
            </div>
          </div>
        </div>
        <hr />
        <p>{groupExplanation}</p>
      </Card>
    </div>
  )
}
