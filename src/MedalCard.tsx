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
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import AmountInput from './AmountInput';


export default function MedalCard(props: any) {
  return (
    <Card variant="outlined" sx={{ minWidth: 275 }} className='marg-bott-20'>
      <CardContent>
        <Chip label={`Collected ${props.balances[props.token.tokenId - 1]} / ${props.token.total}`} />
        <div className="mp__flex mp__flexGrow mp__flexCentered">
          <img src={props.token.img} className="nftImg" alt="logo" />
        </div>
        <h3 className="mp__margBott10">{props.token.name}</h3>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {props.token.description}
        </Typography>
        <AmountInput
          setAmounts={props.setAmounts}
          tokenId={props.token.tokenId}
          amounts={props.amounts}
        />
        <Button
          variant="contained"
          className='mp__margTop10 demoBtn fullWidth'
          onClick={() => {
            props.transfer(
              props.chains,
              props.token.tokenId,
              props.amounts[props.token.tokenId]
            )
          }}
        >
          Move
        </Button>
      </CardContent>
    </Card>
  )
}