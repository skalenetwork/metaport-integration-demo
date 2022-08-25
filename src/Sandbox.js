import React from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CancelIcon from '@mui/icons-material/Cancel';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';


const TOKENS = {
  'mainnet': {
    'eth': {},
  },
  'rapping-zuben-elakrab': {
    'erc20': {
      "ruby": {
        "name": "RUBY",
        "address": "0x296cc9cCCDB292bEf53dF56f732CeFE592222C0c",
        "iconUrl": "https://ruby.exchange/images/tokens/ruby-square.png"
      },
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

const SCHAINS = ['mainnet', 'rapping-zuben-elakrab', 'deafening-maia'];

export default function Sandbox(props) {
  
  function openSandbox() {
    props.widget.reset();
    props.widget.updateParams({chains: SCHAINS, tokens: TOKENS});
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
              Open Metaport popup to perform custom transfers. <br/>
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