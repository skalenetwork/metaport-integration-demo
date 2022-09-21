import './App.css';
import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import Header from './Header';
import S2SDemo from './S2SDemo';
import Sandbox from './Sandbox';
import WrapDemo from './WrapDemo';
import KnownIssues from './KnownIssues';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tab from '@mui/material/Tab';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import LinkIcon from '@mui/icons-material/Link';

import { Metaport, interfaces } from '@skalenetwork/metaport';


export const MAINNET_ENDPOINT = process.env["REACT_APP_MAINNET_ENDPOINT"];


interface MetaportThemesMap { [themeName: string]: interfaces.MetaportTheme; }

export const themes: MetaportThemesMap = {
  'blue': {
    primary: '#00d4ff',
    background: '#0a2540',
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


const widget = new Metaport({
  // open: false,
  mainnetEndpoint: MAINNET_ENDPOINT,
  // skaleNetwork: 'mainnet',
  skaleNetwork: 'staging',
  openButton: false, // default = true
  // autoLookup: false, // default = true
  chains: [
    // 'rapping-zuben-elakrab',
    // 'deafening-maia'
  ],
  chainsMetadata: {
    'elated-tan-skat': {
      alias: 'Ruby Chain'
    },
    'rapping-zuben-elakrab': {
      alias: 'Europa SKALE Chain', // optional
      minSfuelWei: '27000000000000', // optional
      faucetUrl: 'https://github.com/skalenetwork/skale-network' // optional
    },
    'deafening-maia': {
      alias: 'Block Brawlers'
    }
  },
  tokens: {},
  theme: themes['green']
});


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
  const [colorScheme, setColorScheme] = React.useState('green');
  const [muiTheme, setMuiTheme] = React.useState(createMuiTheme(themes[colorScheme]));

  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    setMuiTheme(createMuiTheme(themes[colorScheme]));
    widget.setTheme(themes[colorScheme]);
  }, [colorScheme]);

  return (
    <ThemeProvider theme={muiTheme}>
      <div className={'AppWrap demoApp ' + (themes[colorScheme].mode === 'dark' ? 'demoApp-dark' : 'demoApp-light')}>
        <Header
          colorScheme={colorScheme}
          setColorScheme={setColorScheme}
        />
        <div className='mainApp'>
          <Container maxWidth="sm" >
            <Box>
              <Stack spacing={3}>
                <div className='mp__margTop20'>
                  <Typography sx={{ mb: 1.5 }} variant='h4' color="text.primary" className='no-marg-bott'>
                    Metaport integration
                  </Typography>
                </div>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <TabContext value={value}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                      <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label='S2S Demo' value="1" />
                        <Tab label="Wrap Demo" value="2" />
                        <Tab label="Sandbox" value="3" />
                      </TabList>
                    </Box>
                    <TabPanel value="1">
                      <S2SDemo
                        open={open}
                        setOpen={setOpen}
                        widget={widget}
                      />
                    </TabPanel>
                    <TabPanel value="2">
                      <WrapDemo
                        open={open}
                        setOpen={setOpen}
                        widget={widget}
                      />
                    </TabPanel>
                    <TabPanel value="3">
                      <Sandbox
                        open={open}
                        setOpen={setOpen}
                        widget={widget}
                      />
                    </TabPanel>
                  </TabContext>
                </Box>

                <div>
                  <Link className='mp__margTop20' target="_blank" href="https://rapping-zuben-elakrab.explorer.staging-v2.skalenodes.com/" underline="none">
                    <Button size='small' variant="outlined" startIcon={<LinkIcon />} className='no-text-transform'>
                      Go to Europa Hub block explorer (rapping-zuben-elakrab)
                    </Button>
                  </Link>


                  <Link target="_blank" href="https://deafening-maia.explorer.staging-v2.skalenodes.com/" underline="none" >
                    <Button size='small' variant="outlined" startIcon={<LinkIcon />} className='no-text-transform mp__margTop10 marg-bott-20'>
                      Go to Block Brawlers block explorer (deafening-maia)
                    </Button>
                  </Link>
                </div>

                <Typography sx={{ mb: 1.5 }} variant='h5' color="text.primary" style={{ "fontWeight": "600" }}>
                  Known issues
                </Typography>
                <KnownIssues />
              </Stack>
            </Box>
          </Container>
        </div>

        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
            Tokens transfered successfully!
          </Alert>
        </Snackbar>

      </div>
    </ThemeProvider>
  );
}

export default App;
