import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Index from './Index/Index.js';
import Shotchart from './Shotchart/Shotchart.js';
import Test from './test/Test.js';

export default function App() {
  return (
    <Router>
      <div>
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route exact path="/" component={Index}/>
          <Route path="/shotchart" component ={Shotchart}/>
          <Route path="/test" component ={Test}/>
        </Switch>
      </div>
    </Router>
  );
}

