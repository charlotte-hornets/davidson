import * as React from 'react';
import Button from '@mui/material/Button';

export default function NavButton(props){
    return <Button color={props.color} onClick={() => {
        window.location = props.url}
    }>{props.text}</Button>
}