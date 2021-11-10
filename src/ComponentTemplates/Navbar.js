import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import NavButton from './NavButton';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="error" position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            'Cats Stats Shot Chart System
          </Typography>
          <NavButton color="inherit" url="/" text="Input" />
          <NavButton color="inherit" url="/test" text="Analysis"/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}