import React from 'react';


export default class Mapper extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            x: "N/A",
            y: "N/A"
        };
    }
    _onMouseClick(e) {
        this.setState({x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY});
    }

    render() {
        let img_source = "https://thumbs.dreamstime.com/b/frontal-view-basket-basketball-field-geometric-flat-vector-illustration-154497636.jpg"
        const { x, y } = this.state;
        return (<div className="container">
          <div>
            <img onClick={this._onMouseClick.bind(this)} width="800" height="447" src={img_source} />
          </div>
          <h1>{ x } { y }</h1><br/>
        </div>);
    }
}
