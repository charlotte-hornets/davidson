
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
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
        <Routes>
          <Route exact path="/" element={<Index/>}/>
          <Route path="/shotchart" element ={<Shotchart/>}/>
          <Route path="/analysis" element={<Analysis/>}/>
        </Routes>
      </div>
    </Router>
    </ThemeProvider>
  );
}

