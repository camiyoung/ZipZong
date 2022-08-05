import React, { useState } from "react"

import Button from "../components/button/Button"
import Select from "../components/input/Select"
import SmallTextInput from "../components/input/SmallTextInput"
import LargeTextInput from "../components/input/LargeTextInput"
import TextArea from "../components/input/TextArea"
import ImageIcon from "../components/icon/ImageIcon"
import NameSquare from "../components/nameSquare/NameSquare"
import Card from "../components/card/Card"
import Timer from "../components/timer/Timer"
import CalendarForm from "../components/calendar/CalendarForm"
import Modal from "../components/modal/Modal"
import { Spinner } from "../components/spinner/Spinner"

export default function Components() {
  const [isOpen, setOpen] = useState(false)
  const modalClose = () => setOpen(false)

  return (
    <div className="prose prose-slate max-w-none">
      <Modal isOpen={isOpen} modalClose={modalClose}>
        <div>모달을 띄워보았습니다</div>
        <div className="flex justify-end">
          <Button onClick={() => modalClose()} text="닫기" />
        </div>
      </Modal>

      <h1>색상표</h1>
      <div className="flex">
        <div className="bg-mainBlue w-24 m-1">mainBlue</div>
        <div className="bg-lightBlue w-24 m-1">lightBlue</div>
        <div className="bg-begie w-24 m-1">begie</div>
        <div className="bg-warning w-24 m-1">warning</div>
        <div className="bg-info w-24 m-1">info</div>
        <div className="bg-danger w-24 m-1">danger</div>
        <div className="bg-darkGray w-24  m-1 text-white">darkGray</div>
        <div className="bg-lightGray w-24 m-1">lightGray</div>
      </div>
      <h3>primary</h3>
      <div className="flex">
        <div className="bg-primary-100  m-1">primary-100</div>
        <div className="bg-primary-200  m-1">primary-200</div>
        <div className="bg-primary-300  m-1">primary-300</div>
        <div className="bg-primary-400  m-1">primary-400</div>
        <div className="bg-primary-500  m-1">primary-500</div>
        <div className="bg-primary-600  m-1 text-white">primary-600</div>
        <div className="bg-primary-700  m-1 text-white">primary-700</div>
        <div className="bg-primary-800  m-1 text-white">primary-800</div>
        <div className="bg-primary-900  m-1 text-white">primary-900</div>
      </div>
      <h3>secondary</h3>
      <div className="flex">
        <div className="bg-secondary-100 m-1">secondary-100</div>
        <div className="bg-secondary-200  m-1">secondary-200</div>
        <div className="bg-secondary-300  m-1">secondary-300</div>
        <div className="bg-secondary-400  m-1">secondary-400</div>
        <div className="bg-secondary-500  m-1">secondary-500</div>
        <div className="bg-secondary-600  m-1 text-white">secondary-600</div>
        <div className="bg-secondary-700  m-1 text-white">secondary-700</div>
        <div className="bg-secondary-800  m-1 text-white">secondary-800</div>
        <div className="bg-secondary-900  m-1 text-white">secondary-900</div>
      </div>
      <h3>lgBlue</h3>
      <div className="flex">
        <div className="bg-lgBlue-100 m-1">lgBlue-100</div>
        <div className="bg-lgBlue-200  m-1">lgBlue-200</div>
        <div className="bg-lgBlue-300  m-1">lgBlue-300</div>
        <div className="bg-lgBlue-400  m-1">lgBlue-400</div>
        <div className="bg-lgBlue-500  m-1">lgBlue-500</div>
        <div className="bg-lgBlue-600  m-1 text-white">lgBlue-600</div>
        <div className="bg-lgBlue-700  m-1 text-white">lgBlue-700</div>
        <div className="bg-lgBlue-800  m-1 text-white">lgBlue-800</div>
        <div className="bg-lgBlue-900  m-1 text-white">lgBlue-900</div>
      </div>
      <hr></hr>
      <h1> 컴포넌트 목록 </h1>
      <h2>Spinner</h2>
      <Spinner />

      <h2>Buttons and Modals</h2>
      <div className="flex">
        <Button
          text="덜 둥근 버튼"
          round="roundMd"
          onClick={() => setOpen(true)}
        />
        <Button
          text="정말 둥근 버튼"
          round="round3xl"
          onClick={() => setOpen(true)}
        />
      </div>
      <h2>Form 요소</h2>
      <Select
        selectName="제목(select)"
        options="옵션의 value들"
        optionName="출력되는 값들"
      />

      <SmallTextInput inputName="제목(small)" />
      <LargeTextInput inputName="제목(large)" />
      <TextArea TextAreaName="제목(textarea)" />

      <h2>Image Placeholder</h2>
      <ImageIcon
        image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg"
        size="small"
      />
      <ImageIcon
        image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg"
        size="xLarge"
      />

      <h2>Timer</h2>
      <Timer time={60} />

      <h2>Card</h2>
      <Card size="small">
        사이즈 : small w-32
        <br />
        세로는 내용물 크기에 따라 적용됩니다.
      </Card>
      <Card size="middle">
        사이즈 : middle <br />
        w-32
      </Card>
      <Card size="large">
        사이즈 : large <br />
        w-32
      </Card>
      <Card size="50%">
        사이즈 : 50% 세로 크기는 지정되지 않음. 사용하는 컴포넌트에서 지정
        <br />
        가능한 옵션 : 25%,50%,75%,100%
      </Card>
      <h2>List</h2>
      <h2>Name Square</h2>
      <h3>아이콘이 들어갔을 때</h3>
      <NameSquare text="아이콘있음">
        <ImageIcon image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg" />
      </NameSquare>
      <NameSquare text="아이콘없음" color="blue" />
      <h3>컬러 </h3>
      <NameSquare color="white" size="small" text="white" />
      <NameSquare color="blue" size="small" text="blue" />

      <h3>크기 </h3>
      <NameSquare color="white" size="small" text="small" />
      <NameSquare color="white" size="middle" text="middle" />
      <NameSquare color="white" size="large" text="large" />
      <h2>Navbar</h2>

      <h2>Calendar</h2>
      <CalendarForm />
    </div>
  )
}
