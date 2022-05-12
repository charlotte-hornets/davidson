import Button from '@material-ui/core/Button';
import React from 'react';


export default function Undo(props) {
    return <Button fullWidth color="primary" variant="contained" onClick={props.undoFunction}>Undo</Button>
}