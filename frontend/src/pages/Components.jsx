import Button from "../components/button/Button"
import Select from "../components/input/Select"
import SmallTextInput from "../components/input/SmallTextInput"
import LargeTextInput from "../components/input/LargeTextInput"
import TextArea from "../components/input/TextArea"
import SmallIcon from "../components/icon/SmallIcon"
import LargeIcon from "../components/icon/LargeIcon"
import NameSquare from "../components/NameSquare/NameSquare"
import Card from "../components/card/Card"
import Timer from "../components/timer/Timer"
import CalendarForm from "../components/calendar/CalendarForm"
export default function Components() {
  return (
    <div className="prose prose-slate">
      <h1> 컴포넌트 목록 </h1>
      <h2>Buttons</h2>
      <Button btnname="이거 들어갔나" />
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
      <SmallIcon image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg" />
      <LargeIcon image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg" />

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
        <SmallIcon image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg" />
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
