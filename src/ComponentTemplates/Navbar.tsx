import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import NavButton from './NavButton';
import Slide from '@mui/material/Slide';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { Avatar } from '@mui/material';
import InputIcon from '@mui/icons-material/Input';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import hexcatwhite from "../logos/hexcatwhite.png";
import hexcatblack from "../logos/hexcatblack.png";
const drawerWidth = 240;

interface ScrollProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  children: React.ReactElement;
}

function HideOnScroll(props: ScrollProps) {
  const { children } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  content: React.ReactElement;
  active: string;
  theme: any
  modeFlip: (event: React.MouseEvent<HTMLElement>) => void
}

export default function ResponsiveDrawer(props: Props) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const modeFlip = props.modeFlip;

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {['Input', 'Analysis'].map((text, index) => (
          <ListItem button key={text} selected={text === props.active} onClick={() => {
            if (text === 'Input') {
              window.location.href = '/'
            } else if (text === 'Analysis') {
              window.location.href = '/analysis?defaultTeam=281'
            }
          }}>
            <ListItemIcon>
              {index % 2 === 0 ? <InputIcon /> : <AnalyticsIcon />}
            </ListItemIcon>
            <ListItemText disableTypography sx={{ fontWeight: 700, fontFamily: "Roboto Condensed" }} primary={text.toUpperCase()} />
          </ListItem>
        ))}
      </List>
      <Divider />
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <HideOnScroll>
        <AppBar position="fixed" sx={{
          boxShadow: 0,
          background: props.theme.palette.secondary.main
        }}>
          <Toolbar disableGutters sx={{ ml: 4 }}>
            <IconButton color="inherit" aria-label="open drawer" edge="start"
              onClick={handleDrawerToggle} sx={{
                mr: 2, display: { sm: 'none' }
              }}
            >
              <MenuIcon />
            </IconButton>
            <Box sx={{mr: 1.5}}>
            <img src={props.theme.palette.mode === 'dark' ? hexcatwhite : hexcatblack} style={{height: "35px"}}/>
            </Box>
            
            <Typography variant="h3" color="text.primary" noWrap component="div" sx={{ "&:hover": { cursor: "pointer" } }} onClick={() => { window.location.href = "/" }}>
              HEXCAT
            </Typography>
            <Box flexGrow={1} />
            <Box sx={{ display: { xs: "none", sm: "flex" } }}>
              <NavButton text={"Input"} url="/" active={props.active === "Input"} theme={props.theme} />
              <NavButton text={"Analysis"} url={"/analysis?defaultTeam=281"} active={props.active === "Analysis"} theme={props.theme} />
            </Box>
            <IconButton sx={{ mr: 2 }} onClick={modeFlip}>
              {props.theme.palette.mode === 'dark' ? <Brightness7Icon style={{ fill: "white" }} /> : <Brightness4Icon style={{ fill: "#494949" }} />}
            </IconButton>
            <Box sx={{ mr: 4 }}>
              <Avatar />
            </Box>

          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Box
        component="nav"
        sx={{ flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
      >
        <Toolbar />
        <Box sx={{}}>
          {props.content}
        </Box>

      </Box>
    </Box>
  );
}