import logo from './logo.svg';
import './App.css';

import { useState, Component } from 'react';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 1
    }
  }

  render() {
    return [1, 2, 3, 4].map((i) => {
      return <div key={i} onClick={() => this.setState({count: this.state.count + 1})}>
        {i} Count {this.state.count}
      </div>
    })
  }
}


