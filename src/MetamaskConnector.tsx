import React from "react";
import TextField from '@mui/material/TextField';

import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase/ButtonBase';

import electric_plug_3d from './electric_plug_3d.png';
import face_with_monocle_3d from './face_with_monocle_3d.png';


export default function MetamaskConnector(props: any) {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        props.setAmount(event.target.value);
    };
    return (
        <div className=''>
            {(props.address ? (<ButtonBase
                onClick={props.connectMetamask}
                className='mp__btnConnect'
            >
                <Paper elevation={0} className='mp__flex mp__flexCentered'>
                    <h3 className='mp__btnChain'>{props.address}</h3>
                    <img src={face_with_monocle_3d} alt="logo" className='mp__iconConnect' />
                </Paper>
            </ButtonBase>) : (<ButtonBase
                onClick={props.connectMetamask}
                className='mp__btnConnect'
            >
                <Paper elevation={0} className='mp__flex mp__flexCentered'>
                    <h3 className='mp__btnChain'>Connect wallet</h3>
                    <img src={electric_plug_3d} alt="logo" className='mp__iconConnect' />
                </Paper>
            </ButtonBase>))
            }



        </div >
    )
}
