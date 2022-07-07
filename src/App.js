import './App.css';
import React, { useEffect } from 'react';

import logoBB from './bb_logo.png'
import logoSkale from './Skale_Logo_Black.png'

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

// import { SChain } from '@skalenetwork/ima-js';
// import sChainAbi from './schianAbi.json';

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
        "usdt": {
          "name": "Tether",
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
  }
});


function App() {

  const [open, setOpen] = React.useState(false);

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

  function widgetConnected() {
    setConnected(true);
  }

  function requestBalances() {
    widget.requestBalance('rapping-zuben-elakrab', 'usdt');
    widget.requestBalance('deafening-maia', 'usdt');
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
    return balance ? 'Balance: ' + fromWei(balance) + ' USDT' : 'Loading balance...'
  }

  return (
    <div className='demoApp'>
      <Container maxWidth="sm" >
        <Box>
        <Stack spacing={2}>
            <div className='marg-top-20'>
              <h1 className='no-mdarg-bott'>IMA Widget integration</h1>
            </div>

            <Card variant="outlined">
              <CardContent>
                <Chip label="Step 1: Transfer from origin chain" />

                <div className='flex-container fl-centered-vert marg-top-20 marg-bott-20'>
                  <div className='flex-container'>
                    <img className='skaleLogo' src={logoSkale}/>
                  </div>
                  <div className='flex-container marg-ri-20 marg-left-20'>
                    <ArrowForwardIcon/>
                  </div>
                  <div className='flex-container'>
                    <img className='bbLogo' src={logoBB}/>
                  </div>
                </div>

                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Transfer USDT from Europa Hub to Block Brawlers
                </Typography>

                {/* <Button
                  onClick={requestTransfer}
                  variant="contained"
                  startIcon={<ExploreIcon />}
                  disabled={loading2 || loading || amount === null}
                  className='marg-top-10'
                >
                  {loading ? '' : 'Connect to start'}
                </Button> */}

                <Typography sx={{ mb: 1.5 }} color="text.secondary">  
                  {getBalanceText(balance)}
                </Typography>

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
                      100 USDT
                    </ToggleButton>
                    <ToggleButton value="250" aria-label="centered">
                      250 USDT
                    </ToggleButton>
                    <ToggleButton value="500" aria-label="right aligned">
                      500 USDT
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
                  <img className='skaleLogo' src={logoSkale}/>
                </div>
              </div>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Transfer cloned USDT from Block Brawlers back to origin chain
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
                      50 USDT
                    </ToggleButton>
                    <ToggleButton value="70" aria-label="centered">
                      70 USDT
                    </ToggleButton>
                    <ToggleButton value="300" aria-label="right aligned">
                      300 USDT
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
              <h1 className='no-mdarg-bott'>Sandbox</h1>
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
            

          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Tokens transfered successfully!
            </Alert>
          </Snackbar>
        </Stack>
        </Box>
      </Container>
    </div>
  );
}

export default App;
