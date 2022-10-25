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

import React from 'react';

import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CancelIcon from '@mui/icons-material/Cancel';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import planet1Img from './nfts/planet-1.png'
import planet2Img from './nfts/planet-2.png'
import planet3Img from './nfts/planet-3.png'
import rocketImg from './nfts/rocket.png'
import satelliteImg from './nfts/satellite.png'


const NFTs = [
  {
    'name': 'SKALE Rocket',
    'img': rocketImg,
    'type': 'rare'
  },
  {
    'name': 'Planet #1',
    'img': planet1Img,
    'type': 'common'
  },
  {
    'name': 'Planet #2',
    'img': planet2Img,
    'type': 'common'
  },
  {
    'name': 'Planet #3',
    'img': planet3Img,
    'type': 'common'
  },
  {
    'name': 'SKALE Satellite',
    'img': satelliteImg,
    'type': 'rare'
  }
]


export default function NFTMarketplace(props: any) {


  function transfer(tokenId: string): void {
    props.metaport.transfer({
      tokenId: tokenId,
      chains: ['mainnet', 'rapping-zuben-elakrab'],
      tokenKeyname: '_TST_0x661211b4A7D50CBa24CE99663Bd999Cb394FC5dA',
      tokenType: 'erc721meta'
    });
  }

  return (
    <Container maxWidth="md">
      <Stack spacing={3}>
        <h1 className="mp__noMarg">NFT Marketplace</h1>
        <Typography sx={{ mb: 1.5 }} color="text.secondary" className='mp__margBott10 mp__noMargTop'>
          In this demo you can try ERC721 NFT transfers
        </Typography>


        <h2>Mainnet</h2>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Card variant="outlined" sx={{ minWidth: 275 }} className='marg-bott-20'>
                <CardContent>
                  <Chip color="warning" label="Rare Item" />
                  <div className="mp__flex fullWidth">
                    <img src={rocketImg} className="nftImg mp__flexGrow mp__flexCentered" alt="logo" />
                  </div>
                  <h3>SKALE Rocket</h3>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" className=''>
                    Item description placeholder text goes here.
                  </Typography>
                  <Button
                    variant="contained"
                    className='mp__margTop10 demoBtn fullWidth'
                    onClick={() => { transfer('1') }}
                  >
                    Transfer to SKALE Chain
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            {/* <Grid item xs={4}>
              <Card variant="outlined" sx={{ minWidth: 275 }} className='marg-bott-20'>
                <CardContent>
                  <Chip label="Common Item" />
                  <div className="mp__flex mp__flexCentered fullWidth nftImgWrap">
                    <img src={planet2Img} className="nftImg mp__flexGrow mp__flexCentered" alt="logo" />
                  </div>
                  <h3>Planet #2</h3>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" className='mp__margTop20'>
                    Item description placeholder text goes here.
                  </Typography>
                  <Button
                    onClick={() => { }}
                    variant="contained"
                    className='mp__margTop10 demoBtn fullWidth'
                  >
                    Transfer to SKALE Chain
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant="outlined" sx={{ minWidth: 275 }} className='marg-bott-20'>
                <CardContent>
                  <Chip color="warning" label="Rare Item" />
                  <div className="mp__flex fullWidth">
                    <img src={satelliteImg} className="nftImg mp__flexGrow mp__flexCentered" alt="logo" />
                  </div>
                  <h3>SKALE Satellite</h3>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" className='mp__margTop20'>
                    Item description placeholder text goes here.
                  </Typography>
                  <Button
                    onClick={() => { }}
                    variant="contained"
                    className='mp__margTop10 demoBtn fullWidth'
                  >
                    Transfer to SKALE Chain
                  </Button>
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
        </Box>

        <h2>SKALE Chain</h2>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {/* <Grid item xs={4}>
              <Card variant="outlined" sx={{ minWidth: 275 }} className='marg-bott-20'>
                <CardContent>
                  <Chip label="Common Item" />
                  <div className="mp__flex fullWidth">
                    <img src={planet3Img} className="nftImg mp__flexGrow mp__flexCentered" alt="logo" />
                  </div>
                  <h3>Planet #3</h3>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" className='mp__margTop20'>
                    Item description placeholder text goes here.
                  </Typography>
                  <Button
                    onClick={() => { }}
                    variant="contained"
                    className='mp__margTop10 demoBtn fullWidth'
                  >
                    Transfer to Mainnet
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card variant="outlined" sx={{ minWidth: 275 }} className='marg-bott-20'>
                <CardContent>
                  <Chip label="Common Item" />
                  <div className="mp__flex fullWidth">
                    <img src={planet1Img} className="nftImg mp__flexGrow mp__flexCentered" alt="logo" />
                  </div>
                  <h3>Planet #1</h3>
                  <Typography sx={{ mb: 1.5 }} color="text.secondary" className='mp__margTop20'>
                    Item description placeholder text goes here.
                  </Typography>
                  <Button
                    onClick={() => { }}
                    variant="contained"
                    className='mp__margTop10 demoBtn fullWidth'
                  >
                    Transfer to Mainnet
                  </Button>
                </CardContent>
              </Card>
            </Grid> */}
          </Grid>
        </Box>
      </Stack>
    </Container>
  )
}