import './App.css';
import React, { useEffect } from 'react';

import ModeSwitch from './Switch';
import Header from './Header';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import logoBB from './bb_logo.png'
// import logoSkale from './Skale_Logo_Black.png'
import logoSkaleWhite from './skale_lg.svg'
import logoRuby from './ruby_logo.png'

import Chip from '@mui/material/Chip';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';
import SwipeLeftIcon from '@mui/icons-material/SwipeLeft';
import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CancelIcon from '@mui/icons-material/Cancel';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import LinkIcon from '@mui/icons-material/Link';
import ExploreIcon from '@mui/icons-material/Explore';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { IMAWidget } from '@skalenetwork/ima-widget';

import { fromWei } from 'web3-utils';


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
  }
}


const widget = new IMAWidget({
  open: false,
  mainnetEndpoint: '',
  network: 'staging',
  schains: [
    'rapping-zuben-elakrab',
    'deafening-maia',
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


const defaultColorScheme = 'green';


function App() {

  const [open, setOpen] = React.useState(false);
  const [colorScheme, setColorScheme] = React.useState('green');
  const [muiTheme, setMuiTheme] = React.useState(createMuiTheme(themes[colorScheme]));

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const [connected, setConnected] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const [amount, setAmount] = React.useState('100');
  const [amount2, setAmount2] = React.useState('50');

  const [balance, setBalance] = React.useState(null);
  const [balance2, setBalance2] = React.useState(null);

  useEffect(() => {
    window.addEventListener(
      "transferComplete",
      transferComplete,
      false
    );

    window.addEventListener(
      "widgetConnected",
      widgetConnected,
      false
    );

    window.addEventListener(
      "balanceEvent",
      updateTokenBalance,
      false
    );

    const interval = setInterval(() => requestBalances(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    setMuiTheme(createMuiTheme(themes[colorScheme]));
    widget.setTheme(themes[colorScheme]);
  }, [colorScheme]);

  function widgetConnected() {
    setConnected(true);
  }

  function requestBalances() {
    widget.requestBalance('rapping-zuben-elakrab', 'usdc');
    widget.requestBalance('deafening-maia', 'usdc');
  }

  const handleAmount = (event, newAmount) => {
    setAmount(newAmount);
  };

  const handleAmount2 = (event, newAmount) => {
    setAmount2(newAmount);
  };

  function requestTransfer() {
    setLoading(true);
    widget.requestTransfer({
      amount: amount,
      schains: ['rapping-zuben-elakrab', 'deafening-maia']
    })
  }

  function transferComplete(e) {
    setLoading(false);
    setLoading2(false);
    widget.reset();
    widget.close();
    setOpen(true);
  }

  function updateTokenBalance(e) {
    if (e.detail.schainName == 'rapping-zuben-elakrab') {
      setBalance(e.detail.balance);
    }
    if (e.detail.schainName == 'deafening-maia') {
      setBalance2(e.detail.balance);
    }
  }

  function requestTransferBack() {
    setLoading2(true);
    widget.requestTransfer({
      amount: amount2,
      schains: ['deafening-maia', 'rapping-zuben-elakrab']
    })
  }

  function cancelTransferRequest() {
    setLoading(false);
    widget.reset();
    widget.close();
  }

  function cancelTransferRequest2() {
    setLoading2(false);
    widget.reset();
    widget.close();
  }

  function getBalanceText(balance) {
    if (!connected) {
      return 'Click \'Transfer\' to start'
    }
    return balance ? 'Balance: ' + fromWei(balance) + ' USDC' : 'Loading balance...'
  }

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
                IMA Widget integration
              </Typography>
            </div>

            <Typography sx={{ mb: 1.5 }} color="text.secondary" className='marg-bott-10'>
              This demo demonstrates IMA Widget integration with custom widget theme and event-based interactions.
            </Typography>

            <Card variant="outlined">
              <CardContent>
                <Chip label="Step 1: Transfer from origin chain" />

                <div className='flex-container fl-centered-vert marg-top-20 marg-bott-20'>
                  <div className='flex-container'>
                    <img className='skaleLogo' src={logoRuby}/>
                  </div>
                  <div className='flex-container marg-ri-20 marg-left-20'>
                    <ArrowForwardIcon/>
                  </div>
                  <div className='flex-container'>
                    <img className='bbLogo' src={logoBB}/>
                  </div>
                </div>

                <div className='padd-top-20 padd-bott-20'>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Transfer usdc from Europa Hub to Block Brawlers
                  </Typography>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">  
                    {getBalanceText(balance)}
                  </Typography>
                </div>

                <div className='marg-top-20 marg-bott-10'>
                  <ToggleButtonGroup
                    value={amount}
                    exclusive
                    color="primary"
                    onChange={handleAmount}
                    aria-label="text alignment"
                    disabled={loading2 || loading}
                  >
                    <ToggleButton value="100" aria-label="left aligned">
                      100 usdc
                    </ToggleButton>
                    <ToggleButton value="250" aria-label="centered">
                      250 usdc
                    </ToggleButton>
                    <ToggleButton value="500" aria-label="right aligned">
                      500 usdc
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <Button
                  onClick={requestTransfer}
                  variant="contained"
                  startIcon={<SwipeRightIcon />}
                  disabled={loading2 || loading || amount === null}
                  className='marg-top-10'
                >
                  {loading ? 'Complete transfer in widget' : 'Transfer'}
                </Button>

                <Button 
                  onClick={cancelTransferRequest}
                  variant="contained"
                  className={'marg-top-10 marg-left-10 ' + (loading ? '' : 'hidden')}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>


            <Card variant="outlined" sx={{ minWidth: 275 }}>
              <CardContent>
              <Chip label="Step 2: Transfer clones back" />

              <div className='flex-container fl-centered-vert marg-top-20 marg-bott-20'>
                <div className='flex-container'>
                <img className='bbLogo' src={logoBB}/>
                </div>
                <div className='flex-container marg-ri-20 marg-left-20'>
                  <ArrowForwardIcon/>
                </div>
                <div className='flex-container'>
                  <img className='skaleLogo' src={logoRuby}/>
                </div>
              </div>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Transfer cloned usdc from Block Brawlers back to origin chain
                </Typography>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {getBalanceText(balance2)}
                </Typography>

                <div className='marg-top-20 marg-bott-10'>
                  <ToggleButtonGroup
                    value={amount2}
                    exclusive
                    color="primary"
                    onChange={handleAmount2}
                    aria-label="text alignment"
                    disabled={loading2 || loading}
                  >
                    <ToggleButton value="50" aria-label="left aligned">
                      50 usdc
                    </ToggleButton>
                    <ToggleButton value="70" aria-label="centered">
                      70 usdc
                    </ToggleButton>
                    <ToggleButton value="300" aria-label="right aligned">
                      300 usdc
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>

                <Button
                  onClick={requestTransferBack}
                  variant="contained"
                  startIcon={<SwipeLeftIcon />}
                  disabled={loading2 || loading || amount2 === null}
                  className='marg-top-10'
                >
                  {loading2 ? 'Complete transfer in widget' : 'Transfer'}
                </Button>

                <Button 
                  onClick={cancelTransferRequest2}
                  variant="contained"
                  className={'marg-top-10 marg-left-10 ' + (loading2 ? '' : 'hidden')}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>

            <div className="marg-top-20">
              <p>
                <Link target="_blank" href="https://rapping-zuben-elakrab.explorer.staging-v2.skalenodes.com/" underline="none">
                  <Button size='small' variant="outlined" startIcon={<LinkIcon />} className='no-text-transform'>
                    Go to Europa Hub block explorer (rapping-zuben-elakrab)
                  </Button>
                </Link>
              
                
              </p>
              <p>
                <Link target="_blank" href="https://deafening-maia.explorer.staging-v2.skalenodes.com/" underline="none" >
                  <Button size='small' variant="outlined" startIcon={<LinkIcon />} className='no-text-transform'>
                    Go to Block Brawlers block explorer (deafening-maia)
                  </Button>
                </Link>
              </p>
            </div>

            <div className='marg-todp-20'>
              <Typography weight="bold" sx={{ mb: 1.5 }} variant='h4' color="text.primary" className='no-marg-bott'>
                Sandbox
              </Typography>
            </div>

            <div className='marg-bott-20'>
            <Card variant="outlined" sx={{ minWidth: 275 }} className='marg-bott-20'>
              <CardContent>
                <Chip label="Custom transfers" />
                <Typography sx={{ mb: 1.5 }} color="text.secondary" className='marg-top-20'>
                  Open IMA Widget popup to perform custom transfers. <br/>
                  You will be able to select tokens and chains.
                </Typography>

                <Button
                  onClick={widget.open}
                  variant="contained"
                  startIcon={<OpenInNewIcon />}
                  disabled={loading2 || loading}
                  className='marg-top-10'
                >
                  {loading2 ? 'Open' : 'Open widget'}
                </Button>

                <Button 
                  onClick={widget.close}
                  variant="contained"
                  className={'marg-top-10 marg-left-10 ' + (loading2 ? '' : 'hidden')}
                  startIcon={<CancelIcon />}
                >
                  Close widget
                </Button>
              </CardContent>
            </Card>
            </div>
            

          
        </Stack>
        </Box>
      </Container>
      </div>

      <Snackbar open={open} autoHideDuration={126000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Tokens transfered successfully!
        </Alert>
      </Snackbar>
      
    </div>
    </ThemeProvider>
  );
}

export default App;
