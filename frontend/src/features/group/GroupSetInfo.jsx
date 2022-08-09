import React, { useState } from "react"
import Button from "../../components/button/Button"
import Card from "../../components/card/Card"
import ImageIcon from "../../components/icon/ImageIcon"
import SmallTextInput from "../../components/input/SmallTextInput"
import LargeTextInput from "../../components/input/LargeTextInput"
import Modal from "../../components/modal/Modal"
import { useSelector } from "react-redux"

export default function GroupSetInfo() {
  const { teamName, teamContent, teamRepIcons } = useSelector(
    (state) => state.group
  )

  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)

  return (
    <div>
      {/* 모달 영역 */}
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <form action="">
          <SmallTextInput inputName="그룹 이름"></SmallTextInput>
          <LargeTextInput inputName="그룹 설명"></LargeTextInput>

          <div className="flex justify-end mt-5">
            <div className="mr-3">
              <Button text="개설" bgColor="bg-info" height="h-8" />
            </div>
            <div className="mr-3">
              <Button
                height="h-8"
                text="닫기"
                bgColor="bg-danger"
                onClick={modalClose}
                type="submit"
              />
            </div>
          </div>
        </form>
      </Modal>
      {/* 모달 영역 끝 */}

      <Card className="flex items-center border mx-5 rounded-lg border-gray-400 mt-5">
        <div className="mx-5 my-5">
          <ImageIcon
            size="large"
            image={`images/badgeIcon/${teamRepIcons}.png`}
            shape="round"
          />
        </div>
        <div className="w-  8/12">
          <p className="text-3xl font-semibold mb-3">{teamName}</p>
          <p className="w-96">{teamContent}</p>
        </div>
        <Button
          onClick={() => setOpen(true)}
          text="그룹 프로필 변경"
          height="h-9"
          width="w-48"
        />
      </Card>
    </div>
  )
}
