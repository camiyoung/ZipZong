import Button from "../components/button/Button"
import Select from "../components/input/Select"
import SmallTextInput from "../components/input/SmallTextInput"
import LargeTextInput from "../components/input/LargeTextInput"
import TextArea from "../components/input/TextArea"
import Icon from "../components/Icon"
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
      <Icon image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg" />
      <h2>Card</h2>
      <h2>List</h2>
      <h2>Name Square</h2>
      <h2>Navbar</h2>

      <h2>Calendar</h2>
      <CalendarForm />
    </div>
  )
}
