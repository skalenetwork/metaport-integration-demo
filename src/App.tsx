import './App.scss';
import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Box from '@mui/material/Box';

import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';

import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import { Metaport, interfaces } from '@skalenetwork/metaport';
import metaportConfig from './metaportConfig.json'

import Header from './Header';
import SkDrawer from './SkDrawer';
import Router from './Router';
import { connect, addAccountChangedListener } from './Connector'


interface MetaportThemesMap { [themeName: string]: interfaces.MetaportTheme; }


export const themes: MetaportThemesMap = {
  'default': {
    primary: '#d9e021',
    background: '#191919',
    mode: 'dark'
  },
  'green': {
    primary: '#2dcb74',
    background: '#191919',
    mode: 'dark'
  },
  'orange': {
    primary: '#f96300',
    background: '#ffffff',
    mode: 'light'
  },
  'violet': {
    primary: '#9a66ff',
    background: '#fbf8ff',
    mode: 'light'
  },
  'pink': {
    primary: '#e41c5d',
    background: '#ffffff',
    mode: 'light'
  }
}

const metaport = new Metaport(metaportConfig);


function createMuiTheme(th: any) {
  return createTheme({
    palette: {
      mode: th.mode,
      background: {
        paper: th.background
      },
      primary: {
        main: th.primary,
      },
      secondary: {
        main: th.background
      },
    },
  })
}


function App() {

  const [open, setOpen] = React.useState(false);

  const [colorScheme, setColorScheme] = React.useState('default');
  const [muiTheme, setMuiTheme] = React.useState(createMuiTheme(themes[colorScheme]));

  const [address, setAddress] = React.useState<string>();

  useEffect(() => {
    setMuiTheme(createMuiTheme(themes[colorScheme]));
    metaport.setTheme(themes[colorScheme]);
  }, [colorScheme]);

  useEffect(() => {
    addAccountChangedListener(accountsChangedFallback);
    // addChainChangedListener(chainChangedFallback);
  }, []);

  function connectMetamask() {
    console.log('connectMetamask...');
    connect(networkConnectFallback);
    console.log('Done: connectMetamask...');
  }

  function networkConnectFallback() {

  }

  function accountsChangedFallback(accounts: string[]) {
    if (accounts.length === 0) {
      setAddress(undefined);
      // MetaMask is locked or the user has not connected any accounts
      console.log('Please connect to MetaMask!');
    } else {
      setAddress(accounts[0]);
    }
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const darkMode = themes[colorScheme].mode === 'dark';

  return (
    <ThemeProvider theme={muiTheme}>
      <Box
        sx={{ display: 'flex' }}
        className={'AppWrap demoApp ' + (darkMode ? 'demoApp-dark' : 'demoApp-light')}
      >
        <CssBaseline />
        <Header
          colorScheme={colorScheme}
          setColorScheme={setColorScheme}
          connectMetamask={connectMetamask}
          address={address}
        />
        <SkDrawer />
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Router address={address} metaport={metaport}  setOpen={setOpen}/>
          <Snackbar
            open={open}
            autoHideDuration={8000}
            onClose={handleClose}
          >
            <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
              Transfer completed
            </Alert>
          </Snackbar>
        </Box>
      </Box>
    </ThemeProvider >
  );
}

export default App;
