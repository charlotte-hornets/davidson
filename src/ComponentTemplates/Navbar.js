import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavButton from './NavButton';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{background: "linear-gradient(to bottom right, #ac1a2f, #494949"}} position="static">
        <Toolbar>
          <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
            'CAT CHARTS
          </Typography>
          <NavButton color="inherit" url="/" text="Input" />
          <NavButton color="inherit" url="/analysis?defaultTeam=281" text="Analysis"/>
        </Toolbar>
      </AppBar>
    </Box>
  );
}