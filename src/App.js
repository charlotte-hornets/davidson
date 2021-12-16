
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Index from './Index/Index.js';
import Shotchart from './Shotchart/Shotchart.js';
import { ThemeProvider } from '@mui/material';
import { theme } from './theme';
import Analysis from "./Analysis/Analysis.js";
import Navbar from "./ComponentTemplates/Navbar"

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar/>
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route path="/shotchart" component ={Shotchart}/>
          <Route path="/analysis" component={Analysis}/>
        </Switch>
      </div>
    </Router>
    </ThemeProvider>
  );
}

