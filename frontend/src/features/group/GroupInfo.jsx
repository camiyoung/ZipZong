import React, { useState } from "react"
import Card from "../../components/card/Card"
import ImageIcon from "../../components/icon/ImageIcon"
import UserIcon from "../../components/icon/UserIcon"
import Button from "../../components/button/Button"
import Modal from "../../components/modal/Modal"
import SmallTextInput from "../../components/input/SmallTextInput"
import Select from "../../components/input/Select"
import Radio from "../../components/input/Radio"

function GroupManagement() {
  const [isLeader, setIsLeader] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)
  return (
    <div>
      {/* 모달 영역 */}
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <form action="">
          <SmallTextInput inputName="방 제목"></SmallTextInput>
          <div className="flex">
            <p
              className="
                text-sm
                font-medium
                block
                w-24
                my-auto
                mr-6
              "
            >
              모드 설정
            </p>
            <Radio />
          </div>
          <Select
            selectName="루틴 설정"
            options="옵션의 value들"
            optionName="출력되는 값들"
          />
        </form>

        <div className="flex justify-end mt-5">
          <div className="mr-3">
            <Button text="개설" bgColor="bg-info" height="h-8" />
          </div>
          <div className="mr-3">
            <Button
              height="h-8"
              text="닫기"
              bgColor="bg-danger"
              onClick={() => modalClose()}
            />
          </div>
        </div>
      </Modal>
      {/* 모달 영역 끝 */}

      {/* 카드 영역 */}
      <Card size="100%">
        <div
          className="flex justify-center flex-col mb-1"
          onClick={() => setOpen(true)}
        >
          <p>아직 운동 방이 만들어지지 않았어요!</p>
          <p>여기를 클릭하여 운동 방을 만들어 보세요</p>
        </div>
      </Card>
      <div className="flex justify-evenly mt-5">
        <Button text="운동 루틴 관리" round="round3xl" height="h-7" />
        {/*
        그룹장 ->그룹 설정 및 관리 보임
        그룹원 -> 그룹 탈퇴 보임
        */}
        {isLeader ? (
          <Button text="그룹 설정 및 관리" round="round3xl" height="h-7" />
        ) : (
          <Button text="그룹 탈퇴" round="round3xl" height="h-7" />
        )}
      </div>
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
    <div className="w-full flex mt-5 justify-evenly">
      <Card size="middle">
        <div className="flex">
          <ImageIcon
            image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg"
            size="middle"
            shape="round"
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
