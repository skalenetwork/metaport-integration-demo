import './App.css';

import { IMAWidget } from '@skalenetwork/ima-widget';


const widget = new IMAWidget({
  open: true,
  network: 'staging',
  schains: [
    'rapping-zuben-elakrab',
    'deafening-maia',
    // 'fancy-rasalhague'
  ],
  schainAliases: {
    'rapping-zuben-elakrab': 'Europa SKALE Chain',
    'deafening-maia': 'Block Brawlers',
    // 'fancy-rasalhague': 'NFT Hub'
  },
  tokens: {
    "rapping-zuben-elakrab": {
      "erc20": {
        "skl": {
          "name": "SKALE",
          "address": "0xfdD7961B9A5fa215AddaC7E5C7a8A2e66C884135"
        },
        // "usdt": {
        //   "name": "Tether",
        //   "address": "0xFA000658f5345bCa354C15950e2bf8b0D12FAb3e"
        // },
        // "dai": {
        //   "name": "Dai",
        //   "address": "0xFA000658f5345bCa354C15950e2bf8b0D12FAb3e"
        // },
        // "usdc": {
        //   "name": "USD Coin",
        //   "address": "0xFA000658f5345bCa354C15950e2bf8b0D12FAb3e"
        // }
      }
    }
  }
});


function App() {
  return (
    <div className="App">
      <header className="App-header">
          <div>
            <h1>IMA Widget example</h1>
            <p>
              That's an example of ima-widget integration
            </p>
          </div>
      </header>
    </div>
  );
}

export default App;
