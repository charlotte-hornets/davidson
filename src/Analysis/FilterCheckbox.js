import { FormControlLabel, Checkbox } from '@mui/material';
import React from 'react';

export default function FilterCheckbox(props) {
    return <FormControlLabel value={props.value} control={<Checkbox defaultChecked={true} onChange={props.change}/>} label={props.label}/>
}