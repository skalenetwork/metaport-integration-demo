/**
 * @license
 * SKALE proxy-ui
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */

/**
 * @file NFTMarketplace.js
 * @copyright SKALE Labs 2021-Present
*/

import React, { useEffect } from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CancelIcon from '@mui/icons-material/Cancel';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import Snackbar from '@mui/material/Snackbar';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { interfaces, dataclasses } from '@skalenetwork/metaport';

import AmountInput from './AmountInput';
import { useInterval } from './Interval';
import { initWeb3, initContract } from './Web3Helper';

import MedalCard from './MedalCard';


import medal1 from './nfts/1st_place_medal_3d.png'
import medal2 from './nfts/2nd_place_medal_3d.png'
import medal3 from './nfts/3rd_place_medal_3d.png'


const CHAIN_1_NAME = 'staging-perfect-parallel-gacrux';
const CHAIN_2_NAME = 'staging-severe-violet-wezen';
const TOKEN_TYPE = 'erc1155';


const TOKENS = [
  {
    'name': '1st Place Medal',
    'description': 'Rare medal, made from pure gold.',
    'img': medal1,
    'tokenId': 1,
    'total': 100
  },
  {
    'name': '2nd Place Medal',
    'description': 'Must-have item for every SKALIEN.',
    'img': medal2,
    'tokenId': 2,
    'total': 2000
  },
  {
    'name': '3rd Place Medal',
    'description': 'Common item, can be found across all SKALEverse.',
    'img': medal3,
    'tokenId': 3,
    'total': 30000
  }
];


export default function Medals(props: any) {

  const [open, setOpen] = React.useState(false);

  const [contract1, setContract1] = React.useState<any>();
  const [contract2, setContract2] = React.useState<any>();

  const [amountsS1, setAmountsS1] = React.useState<string[]>(['0', '0', '0']);
  const [amountsS2, setAmountsS2] = React.useState<string[]>(['0', '0', '0']);

  const [balancesS1, setBalancesS1] = React.useState<number[]>([0, 0, 0]);
  const [balancesS2, setBalancesS2] = React.useState<number[]>([0, 0, 0]);

  useEffect(() => {
    const chain1Web3 = initWeb3('staging3', CHAIN_1_NAME);
    const chain2Web3 = initWeb3('staging3', CHAIN_2_NAME);
    setContract1(initContract(TOKEN_TYPE, '0x5D8bD602dC5468B3998e8514A1851bd5888E9639', chain1Web3));
    setContract2(initContract(TOKEN_TYPE, '0x23ca5C01fc73EaB7cb152a9226eE7A9728E118a2', chain2Web3));

    window.addEventListener(
      "metaport_transferComplete",
      transferComplete,
      false
    );
  }, []);

  useEffect(() => {
    if (props.address) getTokenBalances();
  }, [props.address]);

  useInterval(() => {
    getTokenBalances();
  }, 5000);

  function transferComplete() {
    props.metaport.close();
    setOpen(true);
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  async function getTokenBalances() {
    if (contract1 && props.address) {
      const balances1: number[] = await Promise.all(TOKENS.map(async (token): Promise<number> => {
        return await contract1.methods.balanceOf(props.address, token.tokenId).call();
      }));
      setBalancesS1(balances1);
    }
    if (contract2 && props.address) {
      const balances2: number[] = await Promise.all(TOKENS.map(async (token): Promise<number> => {
        return await contract2.methods.balanceOf(props.address, token.tokenId).call();
      }));
      setBalancesS2(balances2);
    }
  }

  function transfer(chains: string[], tokenId: number, amount: string): void {
    const params: interfaces.TransferParams = {
      tokenId: tokenId,
      amount: amount,
      chains: chains,
      tokenKeyname: '_MEDALS2S_0x5D8bD602dC5468B3998e8514A1851bd5888E9639',
      tokenType: dataclasses.TokenType.erc1155,
      lockValue: true
    };
    props.metaport.transfer(params);
  }

  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        <h1 className="mp__noMarg">Medals Demo</h1>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" className='mp__margBott10 mp__noMargTop'>
          In this demo you can transfer ERC1155 medals between the chains. <br />
          There are 100 1st place medals, 2000 2nd place medals and 30000 3rd place medals.
        </Typography>

        {props.address ? (
          <div>
            <h2>Chain 1</h2>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {TOKENS.map((token) => <Grid item lg={4} md={6} xs={12} key={token.tokenId}>
                  <MedalCard
                    chains={[CHAIN_1_NAME, CHAIN_2_NAME]}
                    token={token}
                    transfer={transfer}
                    setAmounts={setAmountsS1}
                    amounts={amountsS1}
                    balances={balancesS1}
                  />
                </Grid>)}
              </Grid>
            </Box>
            <h2>Chain 2</h2>
            <Box sx={{ flexGrow: 1 }}>
              <Grid container spacing={2}>
                {TOKENS.map((token) => <Grid item lg={4} md={6} xs={12} key={token.tokenId}>
                  <MedalCard
                    key={token.tokenId}
                    chains={[CHAIN_2_NAME, CHAIN_1_NAME]}
                    token={token}
                    transfer={transfer}
                    setAmounts={setAmountsS2}
                    amounts={amountsS2}
                    balances={balancesS2}
                  />
                </Grid>)}
              </Grid>
            </Box>
          </div>
        ) : (<h2>Connect your wallet using 'Connect wallet' button to try this demo</h2>)}
      </Stack>


      <Snackbar
        open={open}
        autoHideDuration={8000}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Transfer completed
        </Alert>
      </Snackbar>
    </Container>
  )
}