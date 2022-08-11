import React, { useEffect } from 'react';

import logoBB from './bb_logo.png';
import logoRuby from './ruby_logo.png';
import logoEth from './eth.png';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

import Button from '@mui/material/Button';
import SwipeRightIcon from '@mui/icons-material/SwipeRight';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import CancelIcon from '@mui/icons-material/Cancel';

import MoveUpIcon from '@mui/icons-material/MoveUp';
import MoveDownIcon from '@mui/icons-material/MoveDown';


const ETH_TOKEN = {
  'rapping-zuben-elakrab': {
    'erc20': {
      'wreth': {
        'address': '0xD8AA84EbC1CfafFa4968cDd493235A0ae0872b73',
        'name': 'wreth',
        'wraps': {
          'address': '0xD2Aaa00700000000000000000000000000000000',
          'symbol': 'ethc'
        }
      }
    }
  }
};


export default function WrapDemo(props) {
  const [connected, setConnected] = React.useState(false);

  const [loading, setLoading] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  const [loading3, setLoading3] = React.useState(false);
  const [loading4, setLoading4] = React.useState(false);

  const [amount, setAmount] = React.useState('0.02');
  const [amount2, setAmount2] = React.useState('0.01');
  const [amount3, setAmount3] = React.useState('0.01');
  const [amount4, setAmount4] = React.useState('0.01');

  const [balance, setBalance] = React.useState(null);
  const [balance2, setBalance2] = React.useState(null);
  const [balance3, setBalance3] = React.useState(null);

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

    const interval = setInterval(() => requestBalances(), 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  
  function widgetConnected() {
    setConnected(true);
  }

  function requestBalances() {
    props.widget.requestBalance('rapping-zuben-elakrab', 'eth');
    props.widget.requestBalance('mainnet', 'eth');
  }

  const handleAmount = (event, newAmount) => {
    setAmount(newAmount);
  };

  const handleAmount2 = (event, newAmount) => {
    setAmount2(newAmount);
  };

  const handleAmount3 = (event, newAmount) => {
    setAmount3(newAmount);
  };

  const handleAmount4 = (event, newAmount) => {
    setAmount4(newAmount);
  };

  function requestTransfer() {
    setLoading(true);
    props.widget.transfer({
      amount: amount,
      schains: ['mainnet', 'rapping-zuben-elakrab'],
      tokens: {'mainnet': {'eth': {}}
      }
    });
  }

  function transferComplete(e) {
    console.log("e.details");
    console.log(e);
    console.log(e.detail);
    console.log(e.detail.unwrap);
    console.log(!e.detail.unwrap);
    console.log('-================================================================');

    if(!e.detail.unwrap) {
      setLoading(false);
      setLoading2(false);
      setLoading3(false);
      props.widget.reset();
      props.widget.close();
      props.setOpen(true);
    }
  }

  function updateTokenBalance(e) {
    if (e.detail.schainName == 'rapping-zuben-elakrab') {
      setBalance(e.detail.balance);
    }
    if (e.detail.schainName == 'deafening-maia') {
      setBalance2(e.detail.balance);
    }
  }

  function requestTransfer2() {
    setLoading2(true);
    props.widget.transfer({
      amount: amount2,
      schains: ['rapping-zuben-elakrab', 'deafening-maia'],
      tokens: ETH_TOKEN
    });
  }

  function requestTransfer3() {
    setLoading3(true);
    props.widget.transfer({
      amount: amount3,
      schains: ['deafening-maia', 'rapping-zuben-elakrab'],
      tokens: ETH_TOKEN
    });
  }

  function requestUnwrap() {
    setLoading4(true);
    props.widget.unwrap({
      amount: amount4,
      schains: ['rapping-zuben-elakrab', 'deafening-maia'],
      tokens: ETH_TOKEN
    });
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

  function cancelTransferRequest3() {
    setLoading3(false);
    props.widget.reset();
    props.widget.close();
  }

  function cancelTransferRequest4() {
    setLoading4(false);
    props.widget.reset();
    props.widget.close();
  }

  function getBalanceText(balance) {
    if (!connected) {
      return 'Click \'Transfer\' to start'
    }
    return balance ? 'Balance: ' + balance + ' ETH' : 'Loading balance...'
  }

    return (<div>
        <Stack spacing={3}>
            <Typography sx={{ mb: 1.5 }} color="text.secondary" className='mp__margBott10'>
                This demo demonstrates ETH transfer from Mainnet to Europa chain, wrap and transfer of wrapped wreth to Block Brawlers.
            </Typography>

            <Card variant="outlined">
              <CardContent>
                <Chip label="Step 1: Transfer ETH from Mainnet" />

                <Stack className="mp__margTop10 mp__margBott10" spacing={1}>
                    <div className='mp__flex fl-centered-vert mp__margTop20 marg-bott-20'>
                      <div className='mp__flex'>
                        <img className='ethLogo' src={logoEth}/>
                      </div>
                      <div className='mp__flex marg-ri-20 marg-left-20'>
                        <ArrowForwardIcon/>
                      </div>
                      <div className='mp__flex'>
                        <img className='skaleLogo' src={logoRuby}/>
                      </div>
                    </div>
                </Stack>

                <div className='padd-top-20 padd-bott-20'>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Transfer ETH from Ethereum Mainnet to Europa chain
                  </Typography>
                  {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">  
                    {getBalanceText(balance)}
                  </Typography> */}
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
                    <ToggleButton value="0.01" aria-label="left aligned">
                      0.01 ETH
                    </ToggleButton>
                    <ToggleButton value="0.02" aria-label="centered">
                      0.02 ETH
                    </ToggleButton>
                    <ToggleButton value="0.1" aria-label="right aligned">
                      0.1 ETH
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <Button
                  onClick={requestTransfer}
                  variant="contained"
                  startIcon={<SwipeRightIcon />}
                  disabled={loading2 || loading || amount === null || loading3}
                  className='mp__margTop10'
                >
                  {loading ? 'Complete transfer in widget' : 'Transfer'}
                </Button>

                <Button 
                  onClick={cancelTransferRequest}
                  variant="contained"
                  className={'mp__margTop10 marg-left-10 ' + (loading ? '' : 'hidden')}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Chip label="Step 2: Wrap and transfer to another chain" />

                <Stack className="mp__margTop10 mp__margBott10" spacing={1}>
                    <div className='mp__flex fl-centered-vert mp__margTop20 marg-bott-20'>
                      <div className='mp__flex'>
                        <img className='skaleLogo' src={logoRuby}/>
                      </div>
                      <div className='mp__flex marg-ri-20 marg-left-20'>
                        <ArrowForwardIcon/>
                      </div>
                      <div className='mp__flex'>
                        <MoveUpIcon style={{width: '40pt', height: '40pt'}}/>
                      </div>
                      <div className='mp__flex marg-ri-20 marg-left-20'>
                        <ArrowForwardIcon/>
                      </div>
                      <div className='mp__flex'>
                        <img className='bbLogo' src={logoBB}/>
                      </div>
                    </div>
                </Stack>

                <div className='padd-top-20 padd-bott-20'>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Wrap ETHC into wreth and transfer to Block Brawlers
                  </Typography>
                  {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">  
                    {getBalanceText(balance)}
                  </Typography> */}
                </div>

                <div className='mp__margTop20 mp__margBott10'>
                  <ToggleButtonGroup
                    value={amount2}
                    exclusive
                    color="primary"
                    onChange={handleAmount2}
                    aria-label="text alignment"
                    disabled={loading2 || loading}
                  >
                    <ToggleButton value="0.01" aria-label="left aligned">
                      0.01 ETH
                    </ToggleButton>
                    <ToggleButton value="0.02" aria-label="centered">
                      0.02 ETH
                    </ToggleButton>
                    <ToggleButton value="0.1" aria-label="right aligned">
                      0.1 ETH
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <Button
                  onClick={requestTransfer2}
                  variant="contained"
                  startIcon={<SwipeRightIcon />}
                  disabled={loading2 || loading || amount === null || loading3}
                  className='mp__margTop10'
                >
                  {loading ? 'Complete transfer in widget' : 'Wrap and Transfer'}
                </Button>

                <Button 
                  onClick={cancelTransferRequest2}
                  variant="contained"
                  className={'mp__margTop10 marg-left-10 ' + (loading2 ? '' : 'hidden')}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card>

            <Card variant="outlined">
              <CardContent>
                <Chip label="Step 3: Transfer back and unwrap" />

                <Stack className="mp__margTop10 mp__margBott10" spacing={1}>
                    <div className='mp__flex fl-centered-vert mp__margTop20 marg-bott-20'>
                      <div className='mp__flex'>
                        <img className='bbLogo' src={logoBB}/>
                      </div>
                      <div className='mp__flex marg-ri-20 marg-left-20'>
                        <ArrowForwardIcon/>
                      </div>
                      <div className='mp__flex'>
                        <img className='skaleLogo' src={logoRuby}/>
                      </div>
                      <div className='mp__flex marg-ri-20 marg-left-20'>
                        <ArrowForwardIcon/>
                      </div>
                      <div className='mp__flex'>
                        <MoveDownIcon style={{width: '40pt', height: '40pt'}}/>
                      </div>
                    </div>
                </Stack>

                <div className='padd-top-20 padd-bott-20'>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary">
                    Transfer wreth from Block Brawlers back to Europa chain and unwrap them
                  </Typography>
                  {/* <Typography sx={{ mb: 1.5 }} color="text.secondary">  
                    {getBalanceText(balance)}
                  </Typography> */}
                </div>

                <div className='mp__margTop20 mp__margBott10'>
                  <ToggleButtonGroup
                    value={amount3}
                    exclusive
                    color="primary"
                    onChange={handleAmount3}
                    aria-label="text alignment"
                    disabled={loading2 || loading || amount === null || loading3}
                  >
                    <ToggleButton value="0.01" aria-label="left aligned">
                      0.01 ETH
                    </ToggleButton>
                    <ToggleButton value="0.02" aria-label="centered">
                      0.02 ETH
                    </ToggleButton>
                    <ToggleButton value="0.1" aria-label="right aligned">
                      0.1 ETH
                    </ToggleButton>
                  </ToggleButtonGroup>
                </div>
                <Button
                  onClick={requestTransfer3}
                  variant="contained"
                  startIcon={<SwipeRightIcon />}
                  disabled={loading2 || loading || amount === null || loading3}
                  className='mp__margTop10'
                >
                  {loading ? 'Complete transfer in widget' : 'Transfer back'}
                </Button>

                <Button
                  onClick={cancelTransferRequest3}
                  variant="contained"
                  className={'mp__margTop10 marg-left-10 ' + (loading3 ? '' : 'hidden')}
                  startIcon={<CancelIcon />}
                >
                  Cancel
                </Button>
              </CardContent>
            </Card> 
        </Stack>
    </div>)
}