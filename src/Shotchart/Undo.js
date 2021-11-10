import Button from '@material-ui/core/Button';
import React from 'react';


export default function Undo(props) {
    return <Button color="error" variant="contained" onClick={props.undoFunction}>Undo</Button>
}