import React from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


const TOKENS_AUTO = {
  'mainnet': {
    'eth': {},
    'erc20': {
      "_USDP_0x8E870D67F660D95d5be530380D0eC0bd388289E1": {
        "iconUrl": "https://ruby.exchange/images/tokens/usdp-square.png"
      },
      "_USDC_0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48": {
        "decimals": "6"
      }
    }
  }
};


const TOKENS_MANUAL_MAINNET = {
  'mainnet': {
    'eth': {},
    'erc20': {
      "usdc": {
        "address": "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
        "name": "USDC",
        "decimals": "6"
      }
    }
  }
};

const TOKENS_MANUAL = {
  'mainnet': {
    'eth': {},
    'erc20': {
      "minds": {
        "address": "0xF5F7aD7d2C37CAe59207af43D0BEB4b361fB9Ec8",
        "name": "MINDS",
        "iconUrl": "https://s2.coinmarketcap.com/static/img/coins/64x64/8675.png"
      },
      "music": {
        "address": "0xcF4Ef8082885176313A2f52062Ac079256BBe6De",
        "name": "MUSIC"
      }
    }
  }
};


// const SCHAINS = ['mainnet', 'deafening-maia', 'fancy-rasalhague', 'fit-graffias', 'whispering-turais', 'glamorous-grumium', 'stocky-pleione', 'attractive-merope', 'honorable-steel-rasalhague', 'naive-musty-merope', 'actual-secret-cebalrai', 'rapping-zuben-elakrab', 'roasted-thankful-unukalhai'];
//const SCHAINS = ['rapping-zuben-elakrab', 'mainnet'];
// const SCHAINS = ['mainnet', 'rapping-zuben-elakrab', 'deafening-maia'];

const SCHAINS = ['mainnet', 'elated-tan-skat'];

export default function Sandbox(props) {

  function openSandbox() {
    props.widget.reset();
    props.widget.updateParams({ chains: SCHAINS, tokens: TOKENS_MANUAL_MAINNET });
    props.widget.open();
  }

  function closeMetaport() {
    props.widget.close();
    props.widget.reset();
  }

  return (<div>
    <Stack spacing={3}>
      <Typography sx={{ mb: 1.5 }} color="text.secondary" className='mp__margBott10'>
        Here you can freely explore Metaport functionality - set transfer amount, change networks, etc.
      </Typography>
      <Card variant="outlined" sx={{ minWidth: 275 }} className='marg-bott-20'>
        <CardContent>
          <Chip label="Custom transfers" />
          <Typography sx={{ mb: 1.5 }} color="text.secondary" className='mp__margTop20'>
            Open Metaport popup to perform custom transfers. <br />
            You will be able to select tokens and chains.
          </Typography>
          <Button
            onClick={openSandbox}
            variant="contained"
            startIcon={<OpenInNewIcon />}
            className='mp__margTop10'
          >
            Open Metaport
          </Button>
          <Button
            onClick={closeMetaport}
            variant="contained"
            startIcon={<CancelIcon />}
            className='mp__margTop10 marg-left-10'
          >
            Close Metaport
          </Button>
        </CardContent>
      </Card>
    </Stack>
  </div>)
}