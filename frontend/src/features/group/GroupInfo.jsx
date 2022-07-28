import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import Card from "../../components/card/Card"
import ImageIcon from "../../components/icon/ImageIcon"
import UserIcon from "../../components/icon/UserIcon"
import Button from "../../components/button/Button"
import Modal from "../../components/modal/Modal"
import SmallTextInput from "../../components/input/SmallTextInput"
import Select from "../../components/input/Select"
import Radio from "../../components/input/Radio"

function GroupManagement() {
  const navigate = useNavigate()
  const [isLeader, setIsLeader] = useState(false)
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)
  return (
    <div className="w-full ml-10">
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
      <div className="">
        <Card>
          <div
            className="flex justify-center flex-col mb-1 hover:cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <p className="text-center text-xl font-semibold">
              아직 운동 방이 만들어지지 않았어요!
            </p>
            <p className="text-center text-md font-semibold">
              여기를 클릭하여 운동 방을 만들어 보세요
            </p>
          </div>
        </Card>
      </div>
      <div className=" flex justify-evenly mt-5">
        <Button
          text="운동 루틴 관리"
          round="round3xl"
          height="h-10"
          width="w-full"
          // 그룹장만 운동관리
          onClick={() => navigate("/routine")}
        />
        {/*
        그룹장 ->그룹 설정 및 관리 보임
        그룹원 -> 그룹 탈퇴 보임
        */}
        {isLeader ? (
          <Button
            text="그룹 설정 및 관리"
            round="round3xl"
            height="h-10"
            width="w-full"
          />
        ) : (
          <Button
            text="그룹 탈퇴"
            round="round3xl"
            height="h-10"
            width="w-full"
          />
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
    <div className="w-full flex mt-5">
      <Card size="100%">
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
        <hr className="mb-3 mt-2" />
        <p className="text-md">{groupExplanation}</p>
      </Card>

      <GroupManagement />
    </div>
  )
}
