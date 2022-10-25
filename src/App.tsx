import './App.scss';
import React, { useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link, useLocation } from "react-router-dom";

import NFTMarketplace from './NFTMarketplace';
import SelectPage from './SelectPage';
import Header from './Header';
import S2SDemo from './S2SDemo';
import Sandbox from './Sandbox';
import WrapDemo from './WrapDemo';
import KnownIssues from './KnownIssues';
import Medals from './Medals';

import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Tab from '@mui/material/Tab';

import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import LinkIcon from '@mui/icons-material/Link';
import StorefrontIcon from '@mui/icons-material/Storefront';
import MoveUpIcon from '@mui/icons-material/MoveUp';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';
import ExploreIcon from '@mui/icons-material/Explore';
import WidgetsIcon from '@mui/icons-material/Widgets';
import AddLinkIcon from '@mui/icons-material/AddLink';
import SettingsEthernetIcon from '@mui/icons-material/SettingsEthernet';
import StarsIcon from '@mui/icons-material/Stars';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';

import { Routes, Route } from "react-router-dom";


import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import { Metaport, interfaces } from '@skalenetwork/metaport';
import metaportConfig from './metaportConfig.json'

import { connect, addAccountChangedListener, addChainChangedListener } from './Connector'


const drawerWidth = 240;


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

const widget = new Metaport(metaportConfig);


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
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [colorScheme, setColorScheme] = React.useState('default');
  const [muiTheme, setMuiTheme] = React.useState(createMuiTheme(themes[colorScheme]));

  const [address, setAddress] = React.useState<string>();

  useEffect(() => {
    setMuiTheme(createMuiTheme(themes[colorScheme]));
    widget.setTheme(themes[colorScheme]);
  }, [colorScheme]);

  useEffect(() => {
    addAccountChangedListener(accountsChangedFallback);
    // addChainChangedListener(chainChangedFallback);
  }, []);

  function getAddress() {
    return address;
  }

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

  return (
    <ThemeProvider theme={muiTheme}>
      <Box sx={{ display: 'flex' }} className={'AppWrap demoApp ' + (themes[colorScheme].mode === 'dark' ? 'demoApp-dark' : 'demoApp-light')}>
        <CssBaseline />
        <Header
          colorScheme={colorScheme}
          setColorScheme={setColorScheme}
          connectMetamask={connectMetamask}
          address={address}
        />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }} className="mp__margTop20">
            <h4 className="secondaryText sectionHeader">ERC20</h4>
            <List>
              <ListItem  >
                <Link to="/erc20/sandbox" className="undec fullWidth">
                  <ListItemButton selected={location.pathname === "/erc20/sandbox"}>
                    <ListItemIcon>
                      <ExploreIcon />
                    </ListItemIcon>
                    <ListItemText primary='Sandbox' />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem >
                <Link to="/erc20/s2s2" className="undec fullWidth">
                  <ListItemButton selected={location.pathname === "/erc20/s2s2"}>
                    <ListItemIcon>
                      <ElectricBoltIcon />
                    </ListItemIcon>
                    <ListItemText className='undec' primary='S2S Demo' />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem >
                <ListItemButton>
                  <ListItemIcon>
                    <MoveUpIcon />
                  </ListItemIcon>
                  <ListItemText primary='Wrap Demo' />
                </ListItemButton>
              </ListItem>
            </List>
            <h4 className="secondaryText sectionHeader">ERC1155</h4>
            <List>
              <ListItem >
                <Link to="/erc1155/medals" className="undec fullWidth">
                  <ListItemButton selected={location.pathname === "/erc1155/medals"}>
                    <ListItemIcon>
                      <WorkspacePremiumIcon />
                    </ListItemIcon>
                    <ListItemText primary='Medals Demo' />
                  </ListItemButton>
                </Link>
              </ListItem>

              <ListItem >
                <Link to="/erc721/marketplace" className="undec fullWidth">
                  <ListItemButton selected={location.pathname === "/erc721/marketplace"}>
                    <ListItemIcon>
                      <StorefrontIcon />
                    </ListItemIcon>
                    <ListItemText primary='NFT M2S' />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem >
                <Link to="/erc1155/s2s" className="undec fullWidth">
                  <ListItemButton selected={location.pathname === "/erc1155/s2s"}>
                    <ListItemIcon>
                      <StorefrontIcon />
                    </ListItemIcon>
                    <ListItemText primary='ERC1155 S2S' />
                  </ListItemButton>
                </Link>
              </ListItem>
            </List>
            <h4 className="secondaryText sectionHeader">Manage</h4>
            <List>
              <ListItem >
                <Link to="/admin/connect-chains" className="undec fullWidth">
                  <ListItemButton selected={location.pathname === "/admin/connect-chains"}>
                    <ListItemIcon>
                      <SettingsEthernetIcon />
                    </ListItemIcon>
                    <ListItemText primary='Connect chains' />
                  </ListItemButton>
                </Link>
              </ListItem>
              <ListItem >
                <Link to="/admin/link-tokens" className="undec fullWidth">
                  <ListItemButton selected={location.pathname === "/admin/link-tokens"}>
                    <ListItemIcon>
                      <AddLinkIcon />
                    </ListItemIcon>
                    <ListItemText primary='Link tokens' />
                  </ListItemButton>
                </Link>
              </ListItem>
              {/* <ListItem >
                <Link to="/admin/configure-metaport" className="undec fullWidth">
                  <ListItemButton selected={location.pathname === "/admin/configure-metaport"}>
                    <ListItemIcon>
                      <StarsIcon />
                    </ListItemIcon>
                    <ListItemText primary='Configure Metaport' />
                  </ListItemButton>
                </Link>
              </ListItem> */}

            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar />
          <Routes>
            <Route
              index
              element={<SelectPage />}
            />
            <Route path="erc20" >
              <Route
                path="sandbox"
                element={<Sandbox />}
              />
            </Route>
            <Route path="erc721" >
              <Route
                path="marketplace"
                element={<NFTMarketplace metaport={widget} />}
              />
            </Route>
            <Route path="erc1155" >
              <Route
                path="marketplace"
                element={<NFTMarketplace metaport={widget} />}
              />
              <Route
                path="medals"
                element={<Medals getAddress={getAddress} address={address} metaport={widget} />}
                // render={() => <Medals address={address} metaport={widget} />} 
              />
            </Route>
          </Routes>
        </Box>
      </Box>
    </ThemeProvider >
  );
}

export default App;
