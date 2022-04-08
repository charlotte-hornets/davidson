import * as React from 'react';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';


type Props = {
    url: string,
    text: string
    active: boolean
    theme: any
}

const NavButton = ({url, text, active, theme} : Props) => {
    console.log(active)
    const background = active ? theme.palette.primary.main + "ff" : "#00000000";
    const color = active ? "white" : theme.palette.text.secondary
    return <Button  sx={{height: "56px", fontWeight: 700, mr: 1, backgroundColor: background, color: color, "&:hover": {backgroundColor: theme.palette.primary.main + "cc", color: "white"}}} onClick={() => {
        window.location.href = url;
    }}>{text.toUpperCase()}</Button>
}

export default NavButton;