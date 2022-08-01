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
 * @file Header.js
 * @copyright SKALE Labs 2021-Present
*/

import React from 'react';
import Fab from '@mui/material/Fab';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import logo from './skale_lg.svg';

import { themes } from './App';


export default class Header extends React.Component {
  render() {
    return (
      <AppBar elevation={0} position="fixed" className="sk-header">
        <Toolbar className='flex-container'>
            <div className="flex-container fl-centered-vert fl-grow">
              <img src={logo} className="logo" alt="logo" />
            </div>
            <div className="flex-container marg-ri-10 fl-center-vert">
              <Typography weight="bold" variant='p' color="text.primary" className='no-marg try-text'>
                Try different themes
              </Typography>
            </div>
            <div className="flex-container marg-ri-20 try-icon">
              <ArrowForwardIcon/>
            </div>
            <div className="flex-container marg-ri-20 marg-left-10">
              <Fab
                size="small"
                style={{backgroundColor: themes.violet.primary}}
                onClick={() => {this.props.setColorScheme('violet')}}
              >
                <LightModeIcon style={{color: 'white'}} />
              </Fab>
            </div>
            <div className="flex-container marg-ri-20">
              <Fab
                size="small"
                style={{backgroundColor: themes.blue.primary}}
                onClick={() => {this.props.setColorScheme('blue')}}
              >
                <DarkModeIcon />
              </Fab>
            </div>
            <div className="flex-container marg-ri-20">
              <Fab
                size="small"
                style={{backgroundColor: themes.orange.primary}}
                onClick={() => {this.props.setColorScheme('orange')}}
              >
                <LightModeIcon style={{color: 'white'}} />
              </Fab>
            </div>
            <div className="flex-container marg-ri-20">
              <Fab
                size="small"
                style={{backgroundColor: themes.green.primary}}
                onClick={() => {this.props.setColorScheme('green')}}
              >
                <DarkModeIcon />
              </Fab>
            </div>
            <div className="flex-container margf-ri-20">
              <Fab
                size="small"
                style={{backgroundColor: themes.pink.primary}}
                onClick={() => {this.props.setColorScheme('pink')}}
              >
                <LightModeIcon style={{color: 'white'}} />
              </Fab>
            </div>
        </Toolbar>
    </AppBar>
    )
  }
}