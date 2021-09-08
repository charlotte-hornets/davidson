import logo from './logo.svg';
import './App.css';

import { useState, Component } from 'react';

// class component
/*
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
*/

/*
// functional component
export function App(props) {
  const [count, setCount] = useState(1);
  return <div onClick={() => setCount(count + 1)}>
    {count}
  </div>
}
*/




export function Court(props) {
  return (
    <div>
      <img id="myImgId" alt="" src="https://thumbs.dreamstime.com/b/frontal-view-basket-basketball-field-geometric-flat-vector-illustration-154497636.jpg"/>
      <script type="text/javascript">
        var myImg = document.getElementById("myImgId");
        myImg.onmousedown = GetCoordinates;
      </script>
      <img src="red.gif" width="400" height="300" alt="" id="myImgId" />
      <p>X:<span id="x"></span></p>
      <p>Y:<span id="y"></span></p>
    </div>
  )
}