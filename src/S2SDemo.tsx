import React, { useEffect } from 'react';


import dogLogo from './img/dog_face_3d.png';
import catLogo from './img/cat_face_3d.png';

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

import { interfaces, dataclasses } from '@skalenetwork/metaport';
import metaportConfig from './metaportConfig.json'


export default function S2SDemo(props: any) {
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

    // const interval = setInterval(() => requestBalances(), 5000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, []);


  function widgetConnected() {
    setConnected(true);
  }

  function requestBalances() {
    props.metaport.requestBalance({ 'schainName': 'rapping-zuben-elakrab', 'tokenSymbol': 'usdc' });
    props.metaport.requestBalance({ 'schainName': 'deafening-maia', 'tokenSymbol': 'usdc' });
  }

  const handleAmount = (_event: any, newAmount: React.SetStateAction<string>) => {
    setAmount(newAmount);
  };

  const handleAmount2 = (event: any, newAmount: React.SetStateAction<string>) => {
    setAmount2(newAmount);
  };

  function requestTransfer() {
    setLoading(true);
    const params: interfaces.TransferParams = {
      amount: amount,
      chains: [metaportConfig.chains[1], metaportConfig.chains[2]],
      tokenKeyname: '_USDC_0x099A46F35b627CABee27dc917eDA253fFbC55Be6',
      tokenType: dataclasses.TokenType.erc20,
      lockValue: true
    };
    props.metaport.transfer(params);
  }

  function transferComplete(e: any) {
    if (!e.detail.unwrap) {
      setLoading(false);
      setLoading2(false);
      props.metaport.close();
      props.setOpen(true);
    }
  }

  function updateTokenBalance(e: any) {
    if (e.detail.schainName == 'rapping-zuben-elakrab') {
      setBalance(e.detail.balance);
    }
    if (e.detail.schainName == 'deafening-maia') {
      setBalance2(e.detail.balance);
    }
  }

  function requestTransferBack() {
    setLoading2(true);
    const params: interfaces.TransferParams = {
      amount: amount2,
      chains: [metaportConfig.chains[2], metaportConfig.chains[1]],
      tokenKeyname: '_USDC_0x099A46F35b627CABee27dc917eDA253fFbC55Be6',
      tokenType: dataclasses.TokenType.erc20,
      lockValue: true
    };
    props.metaport.transfer(params);
  }

  function cancelTransferRequest() {
    setLoading(false);
    props.metaport.close();
  }

  function cancelTransferRequest2() {
    setLoading2(false);
    props.metaport.close();
  }

  function getBalanceText(balance: string | null) {
    if (!connected) {
      return 'Click \'Transfer\' to start'
    }
    return balance ? 'Balance: ' + balance + ' USDC' : 'Loading balance...'
  }

  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        <h1 className="mp__noMarg">S2S ERC20 Demo</h1>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" className='mp__margBott10 mp__noMargTop'>
          This demo demonstrates Metaport integration with custom widget theme and event-based interactions.
        </Typography>
        <Stack spacing={3}>
          <Card variant="outlined">
            <CardContent>
              <Chip label="Step 1: Transfer from origin chain" />

              <Stack className="mp__margTop10 mp__margBott10" spacing={1}>
                <div className='mp__flex fl-centered-vert mp__margTop20 marg-bott-20'>
                  <div className='mp__flex'>
                    <img className='chainLogo' src={dogLogo} />
                  </div>
                  <div className='mp__flex marg-ri-20 marg-left-20'>
                    <ArrowForwardIcon />
                  </div>
                  <div className='mp__flex'>
                    <img className='chainLogo' src={catLogo} />
                  </div>
                </div>
              </Stack>


              <div className='padd-top-20 padd-bott-20'>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  Transfer USDC from Dog Chain to Cat Chain
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {getBalanceText(balance)}
                </Typography>
              </div>

              <div className='mp__margTop20 mp__margBott10'>
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
                className='mp__margTop10 demoBtn'
              >
                {loading ? 'Complete transfer in widget' : 'Transfer'}
              </Button>

              <Button
                onClick={cancelTransferRequest}
                variant="contained"
                className={'demoBtn mp__margTop10 marg-left-10 ' + (loading ? '' : 'hidden')}
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>


          <Card variant="outlined" sx={{ minWidth: 275 }}>
            <CardContent>
              <Chip label="Step 2: Transfer clones back" />
              <Stack className="mp__margTop10 mp__margBott10" spacing={1}>
                <div className='mp__flex fl-centered-vert mp__margTop20 marg-bott-20'>
                  <div className='mp__flex'>
                    <img className='chainLogo' src={catLogo} />
                  </div>
                  <div className='mp__flex marg-ri-20 marg-left-20'>
                    <ArrowForwardIcon />
                  </div>
                  <div className='mp__flex'>
                    <img className='chainLogo' src={dogLogo} />
                  </div>
                </div>
              </Stack>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Transfer cloned USDC from Cat Chain back to origin chain
              </Typography>

              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                {getBalanceText(balance2)}
              </Typography>

              <div className='mp__margTop20 mp__margBott10'>
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
                className='demoBtn mp__margTop10'
              >
                {loading2 ? 'Complete transfer in widget' : 'Transfer'}
              </Button>

              <Button
                onClick={cancelTransferRequest2}
                variant="contained"
                className={'demoBtn mp__margTop10 marg-left-10 ' + (loading2 ? '' : 'hidden')}
                startIcon={<CancelIcon />}
              >
                Cancel
              </Button>
            </CardContent>
          </Card>
        </Stack>
      </Stack>
    </Container>)
}