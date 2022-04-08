import Button from '@material-ui/core/Button';
import React from 'react';

type Props = {
    undoFunction: (event: React.MouseEvent<HTMLElement>) => void
}

const Undo = ({undoFunction: undoFunction}: Props) => {
    return <Button fullWidth color="primary" variant="contained" onClick={undoFunction}>Undo</Button>
}

export default Undo;