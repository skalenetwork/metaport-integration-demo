import './App.css';
import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './Header';
import S2SDemo from './S2SDemo';
import Sandbox from './Sandbox';
import WrapDemo from './WrapDemo';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tab from '@mui/material/Tab';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import LinkIcon from '@mui/icons-material/Link';

import { Metaport } from '@skalenetwork/metaport';


export const MAINNET_ENDPOINT = process.env["REACT_APP_MAINNET_ENDPOINT"];


export const themes = {
  'blue': {
    primary: '#00d4ff',
    background: '#0a2540',
    mode: 'dark'
  },
  'green': {
    primary: '#2dcb74',
    background: '#191919',
    mode: 'dark'
  },
  'orange': {
    primary: '#f96300',
    background: '#ffffff',
    mode: 'light'
  },
  'violet': {
    primary: '#9a66ff',
    background: '#fbf8ff',
    mode: 'light'
  },
  'pink': {
    primary: '#e41c5d',
    background: '#ffffff',
    mode: 'light'
  }
}


const widget = new Metaport({
  open: false,
  mainnetEndpoint: MAINNET_ENDPOINT,
  network: 'staging',
  schains: [
    // 'rapping-zuben-elakrab',
    // 'deafening-maia',
    // 'fancy-rasalhague'
  ],
  schainAliases: {
    'rapping-zuben-elakrab': 'Europa SKALE Chain',
    // 'rapping-zuben-elakrab': 'Ruby Exchange',
    'deafening-maia': 'Block Brawlers',
    // 'fancy-rasalhague': 'NFT Hub'
  },
  tokens: {
    "rapping-zuben-elakrab": {
      "erc20": {
        // "skl": {
        //   "name": "SKALE",
        //   "address": "0xDeba4B3e3DCD346E93AC26d8b4e44d0B6D417617"
        // },
        "usdc": {
          "name": "USDC",
          "address": "0x296cc9cCCDB292bEf53dF56f732CeFE592222C0c"
        },
        // "eth": {
        //   "name": "ETH",
        //   "address": "0x296cc9cCCDB292bEf53dF56f732CeFE592222C0c",
        //   "wrapperAddress": "0x0"
        // },
        // "dai": {
        //   "name": "Dai",
        //   "address": "0x5EC4B83f3d52df5bF8177da452C13E679B571f7F"
        // },
        // "usdc": {
        //   "name": "USD Coin",
        //   "address": "0xD19FCA4B1e29224dC19472b5fB860626f236a457"
        // }
      }
    }
  },
  theme: themes['green']
});


// const widget = new IMAWidget({
//   open: false,
//   // mainnetEndpoint: 'http://mainnet-geth.skalenodes.com:8545/',
//   // mainnetEndpoint: 'https://rpc.ankr.com/eth',
//   mainnetEndpoint: 'https://rinkeby.infura.io/v3/fceb4b9a4eee40adb65ede10666e0915',
//   network: 'staging',
//   schains: [
//     'mainnet',
//     'rapping-zuben-elakrab'
//   ],
//   tokens: {
//     'mainnet': {
//       'eth': {},
//     }
//   },
//   schainAliases: {
//     'rapping-zuben-elakrab': 'Europa SKALE Chain'
//   },
//   theme: themes['green']
// });


// const widget = new IMAWidget({
//   open: false,
//   // mainnetEndpoint: 'http://mainnet-geth.skalenodes.com:8545/',
//   // mainnetEndpoint: 'https://rpc.ankr.com/eth',
//   mainnetEndpoint: 'https://rinkeby.infura.io/v3/fceb4b9a4eee40adb65ede10666e0915',
//   network: 'staging',
//   schains: [
//     'rapping-zuben-elakrab',
//     'deafening-maia'
//   ],
//   tokens: {
//     'rapping-zuben-elakrab': {
//       'erc20': {
//         'wreth': {
//           'address': '0xD8AA84EbC1CfafFa4968cDd493235A0ae0872b73',
//           'name': 'wreth',
//           'wraps': {
//             'address': '0xD2Aaa00700000000000000000000000000000000',
//             'symbol': 'ethc'
//           }
//         }
//       }
//     }
//   },
//   schainAliases: {
//     'rapping-zuben-elakrab': 'Europa SKALE Chain',
//     'deafening-maia': 'Block Brawlers'
//   },
//   theme: themes['green']
// });


function createMuiTheme(th) {
  return createTheme({
    palette: {
    mode: th.mode,
    background: {
      paper: th.background
    },
    primary: {
      main: th.primary,
    },
    secondary: {    
      main: th.background
    },
    },
  })
}


function App() {

  const [open, setOpen] = React.useState(false);
  const [colorScheme, setColorScheme] = React.useState('green');
  const [muiTheme, setMuiTheme] = React.useState(createMuiTheme(themes[colorScheme]));

  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setMuiTheme(createMuiTheme(themes[colorScheme]));
    widget.setTheme(themes[colorScheme]);
  }, [colorScheme]);

  return (
    <ThemeProvider theme={muiTheme}>
    <div className={'AppWrap demoApp ' + (themes[colorScheme].mode === 'dark' ? 'demoApp-dark' : 'demoApp-light')}>
      <Header
        colorScheme={colorScheme}
        setColorScheme={setColorScheme}
      />
      <div className='mainApp'>
      <Container maxWidth="sm" >
        <Box>
        <Stack spacing={3}>
            <div className='marg-top-20'>
              <Typography weight="bold" sx={{ mb: 1.5 }} variant='h4' color="text.primary" className='no-marg-bott'>
                Metaport integration
              </Typography>
            </div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="S2S Demo" value="1" />
                    <Tab label="Wrap Demo" value="2" />
                    <Tab label="Sandbox" value="3" />
                  </TabList>
                </Box>
                <TabPanel value="1">
                  <S2SDemo
                    open={open}
                    setOpen={setOpen}
                    widget={widget}
                  /> 
                </TabPanel>
                <TabPanel value="2">
                  <WrapDemo
                      open={open}
                      setOpen={setOpen}
                      widget={widget}
                    /> 
                </TabPanel>
                <TabPanel value="3">
                  <Sandbox
                    open={open}
                    setOpen={setOpen}
                    widget={widget}
                  /> 
                </TabPanel>
              </TabContext>
            </Box>

            <div className='marg-bott-20'>
              <Link className='marg-top-20' target="_blank" href="https://rapping-zuben-elakrab.explorer.staging-v2.skalenodes.com/" underline="none">
                <Button size='small' variant="outlined" startIcon={<LinkIcon />} className='no-text-transform'>
                  Go to Europa Hub block explorer (rapping-zuben-elakrab)
                </Button>
              </Link>
          
           
              <Link  target="_blank" href="https://deafening-maia.explorer.staging-v2.skalenodes.com/" underline="none" >
                <Button size='small' variant="outlined" startIcon={<LinkIcon />} className='no-text-transform marg-top-10 marg-bott-20'>
                  Go to Block Brawlers block explorer (deafening-maia)
                </Button>
              </Link>
            </div>
        </Stack>
        </Box>
      </Container>
      </div>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Tokens transfered successfully!
        </Alert>
      </Snackbar>
      
    </div>
    </ThemeProvider>
  );
}

export default App;
