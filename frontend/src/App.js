import Button from './components/button/Button'
import Select from './components/input/Select'
import Text from './components/input/Text'
import SmallTextInput from './components/input/SmallTextInput'
import LargeTextInput from './components/input/LargeTextInput'
import TextArea from './components/input/TextArea'

function App() {
  return (
    <div>
        <Button btnname="이거 들어갔나" />
        <Select />
        <Text labelInput="1" name="제목" />
        <SmallTextInput inputName="제목(small)" />
        <LargeTextInput inputName="제목(large)" />
        <TextArea TextAreaName="제목(textarea)" />
    </div>
  )
}

export default App
