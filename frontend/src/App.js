import './App.css'
import Button from './components/button/Button'
import Select from './components/input/Select'
import Text from './components/input/Text'

function App() {
  return (
    <div className="App">
        <Button btnname="이거 들어갔나" />
        <Select />
        <Text labelInput="1" name="제목" />
    </div>
  )
}

export default App
