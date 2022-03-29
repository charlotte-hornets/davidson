import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

type Props = {
    url: string,
    text: string
}

const NavButton = ({url, text} : Props) => {
    return <Button color={"inherit"} onClick={() => {
        window.location.href = url;
    }}><Typography>{text}</Typography></Button>
}

export default NavButton;