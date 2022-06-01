import logo from './logo.svg';
import './App.css';

import { IMAWidget } from '@skalenetwork/ima-widget';


const widget = new IMAWidget({
  network: 'staging'
});


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div>
            <h1>IMA Widget example project</h1>
          </div>
      </header>
    </div>
  );
}

export default App;
