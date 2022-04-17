
import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Index from './Index/Index.tsx';
import Shotchart from './Shotchart/Shotchart.js';
import { CssBaseline, ThemeProvider } from "@mui/material";
import Analysis from "./Analysis/Analysis";
import Navbar from "./ComponentTemplates/Navbar"
import { theme } from "./theme.tsx";



export default function App() {

  const [mode, setMode] = useState("light");
  const currTheme = theme(mode);

  const flipMode = (e) => {
    mode === "light" ? setMode("dark") : setMode("light")
  }

  useEffect(() => {
    try {
      setMode(window.localStorage.getItem('mode'));
    } catch {
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem('mode', mode);
  }, [mode]);

  return (
    <ThemeProvider theme={currTheme}>
      <CssBaseline/>
      <Router>
        <div>
          {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
          <Routes>
            <Route exact path="/" element={<Navbar modeFlip={flipMode} theme={currTheme} content={<Index theme={currTheme} />} active="Input" />} />
            <Route path="/shotchart" element={<Navbar modeFlip={flipMode} theme={currTheme} content={<Shotchart theme={currTheme} />} active="Input" />} />
            <Route path="/analysis" element={<Navbar modeFlip={flipMode} theme={currTheme} content={<Analysis theme={currTheme} />} active="Analysis" />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

