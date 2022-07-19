import Button from "../components/button/Button"
import Select from "../components/input/Select"
import SmallTextInput from "../components/input/SmallTextInput"
import LargeTextInput from "../components/input/LargeTextInput"
import TextArea from "../components/input/TextArea"
import Icon from "../components/Icon"
export default function Components() {
  return (
    <div>
      <Button btnname="이거 들어갔나" />
      <Select
        selectName="제목(select)"
        options="옵션의 value들"
        optionName="출력되는 값들"
      />
      <SmallTextInput inputName="제목(small)" />
      <LargeTextInput inputName="제목(large)" />
      <TextArea TextAreaName="제목(textarea)" />
      <Icon image="https://news.samsungdisplay.com/wp-content/uploads/2022/05/IT_twi001t1345955-1-1024x639.jpg" />
    </div>
  )
}
