import * as React from 'react';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function ModeSwitch(props) {
  const handleChange = (event) => {
    props.setDarkMode(event.target.checked);
  };

  return (
    <FormControlLabel control={<Switch
      checked={props.darkMode}
      onChange={handleChange}
      inputProps={{ 'aria-label': 'controlled' }}
    />} label="Dark mode" labelPlacement="start" />
  );
}