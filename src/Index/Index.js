import {Link} from "react-router-dom";

export default function Index(props) {
    return <div>
    <h1 class="center">Welcome to our shot chart program</h1>
      <div class="dropdown dropdown-center">
        <button class="dropbtn">Select Session</button>
        <div class="dropdown-content">
          <a href="/shotchart">New Session</a>
          <a href="/shotchart">Old Session 1</a>
          <a href="/shotchart">Old Session 2</a>
        </div>
      </div>

    </div>
}
