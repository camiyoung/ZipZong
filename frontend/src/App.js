import Button from './components/button/Button'
import Select from './components/input/Select'
import SmallTextInput from './components/input/SmallTextInput'
import LargeTextInput from './components/input/LargeTextInput'
import TextArea from './components/input/TextArea'

function App() {
  return (
    <div>
        <Button btnname="이거 들어갔나" />
        <Select selectName="제목(select)" options="옵션의 value들" optionName="출력되는 값들" />
        <SmallTextInput inputName="제목(small)" />
        <LargeTextInput inputName="제목(large)" />
        <TextArea TextAreaName="제목(textarea)" />
    </div>
  )
}

export default App
