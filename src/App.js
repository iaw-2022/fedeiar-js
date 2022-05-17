import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Saludo from './Saludo.js'

function App() {
  return (
    <div className="App">
      <header className="App-header">
          <Saludo nombre="Federico"></Saludo>
      </header>
    </div>
  );
}

export default App;
