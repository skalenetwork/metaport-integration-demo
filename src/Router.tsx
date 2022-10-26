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


import { Routes, Route } from "react-router-dom";


export default function Router(props: any) {
    return (
        <Routes>
            <Route
                index
                element={<Sandbox address={props.address} metaport={props.metaport} />}
            />
            <Route path="common" >
                <Route
                    path="sandbox"
                    element={<Sandbox address={props.address} metaport={props.metaport} />}
                />
            </Route>
            <Route path="erc20" >
                <Route
                    path="s2s"
                    element={<S2SDemo address={props.address} metaport={props.metaport} />}
                />
                <Route
                    path="wrap"
                    element={<WrapDemo address={props.address} metaport={props.metaport} />}
                />
            </Route>
            <Route path="nft" >
                <Route
                    path="marketplace"
                    element={<NFTMarketplace address={props.address} metaport={props.metaport} />}
                />
                <Route
                    path="medals"
                    element={<Medals address={props.address} metaport={props.metaport} />}
                />
            </Route>
        </Routes>
    );
}
