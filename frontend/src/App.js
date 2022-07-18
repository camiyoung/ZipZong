import logo from './logo.svg';
import './App.css';
import Button from './components/Button'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button />
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      <p className="text-base">asd</p>
      </header>
    </div>
  );
}

export default App;
