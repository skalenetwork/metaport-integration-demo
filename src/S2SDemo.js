import React, { useEffect } from 'react';

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


const TOKENS = {
  'rapping-zuben-elakrab': {
    'erc20': {
      "usdc": {
        "name": "USDC",
        "address": "0x296cc9cCCDB292bEf53dF56f732CeFE592222C0c",
        // "iconUrl": "https://ruby.exchange/images/tokens/ruby-square.png"
      }
    }
  }
};

const SCHAINS = ['rapping-zuben-elakrab', 'deafening-maia'];


export default function S2SDemo(props) {
  const [connected, setConnected] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const [amount, setAmount] = React.useState('100');
  const [amount2, setAmount2] = React.useState('50');

  const [balance, setBalance] = React.useState(null);
  const [balance2, setBalance2] = React.useState(null);

  useEffect(() => {
    window.addEventListener(
      "metaport_transferComplete",
      transferComplete,
      false
    );

    window.addEventListener(
      "metaport_connected",
      widgetConnected,
      false
    );

    window.addEventListener(
      "metaport_balance",
      updateTokenBalance,
      false
    );

    props.widget.updateParams({tokens: TOKENS});

    const interval = setInterval(() => requestBalances(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  
  function widgetConnected() {
    setConnected(true);
  }

  function requestBalances() {
    props.widget.requestBalance({'schainName': 'rapping-zuben-elakrab', 'tokenSymbol': 'usdc'});
    props.widget.requestBalance({'schainName': 'deafening-maia', 'tokenSymbol': 'usdc'});
  }

  const handleAmount = (event, newAmount) => {
    setAmount(newAmount);
  };

  const handleAmount2 = (event, newAmount) => {
    setAmount2(newAmount);
  };

  function requestTransfer() {
    setLoading(true);
    props.widget.transfer({
      amount: amount,
      schains: ['rapping-zuben-elakrab', 'deafening-maia']
    })
  }

  function transferComplete(e) {
    setLoading(false);
    setLoading2(false);
    props.widget.reset();
    props.widget.close();
    props.setOpen(true);
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
    props.widget.transfer({
      amount: amount2,
      schains: ['deafening-maia', 'rapping-zuben-elakrab']
    })
  }

  function cancelTransferRequest() {
    setLoading(false);
    props.widget.reset();
    props.widget.close();
  }

  function cancelTransferRequest2() {
    setLoading2(false);
    props.widget.reset();
    props.widget.close();
  }

  function getBalanceText(balance) {
    if (!connected) {
      return 'Click \'Transfer\' to start'
    }
    return balance ? 'Balance: ' + balance + ' USDC' : 'Loading balance...'
  }

    return (<div>
        <Stack spacing={3}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" className='marg-bott-10'>
                This demo demonstrates Metaport integration with custom widget theme and event-based interactions.
            </Typography>

            <Card variant="outlined">
              <CardContent>
                <Chip label="Step 1: Transfer from origin chain" />

                <Stack className="marg-top-10 marg-bott-10" spacing={1}>
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
                </Stack>
                

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

              <Stack className="marg-top-10 marg-bott-10" spacing={1}>
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
              </Stack>
              
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
        </Stack>
    </div>)
}