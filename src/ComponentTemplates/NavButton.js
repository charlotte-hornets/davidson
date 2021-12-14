import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

export default function NavButton(props){
    return <Button color={props.color} onClick={() => {
        window.location = props.url}
    }><Typography>{props.text}</Typography></Button>
}