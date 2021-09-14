import React, { Component, Fragment } from "react";
import * as d3 from 'd3'
import Helpers from '../Utils/Helpers.js';

export default class Shotchart extends Component {
  constructor(props) {
    super(props);
    var leagueid = 'coll';
    this.state = {
        circle_show: false,
        current_x: "N/A",
        current_y: "N/A",
        threePointLineXY: [],
        chartSettings: {
        // all measurements are in feet...
        league: leagueid,
        // basketball hoop diameter
        basketDiameter: 1.5,
        // baseline to backboard
        basketProtrusionLength: 4,
        // backboard width
        basketWidth: 6,
        // length of basketball court
        courtLength: 94,
        // width of basketball court
        courtWidth: 50,
        // baseline to free throw line
        // 15 + 4 for basket protrusion
        freeThrowLineLength: 19,
        // radius of free throw line circle
        freeThrowCircleRadius: 6,
        height: undefined,
        // length between dashes on side of the paint
        keyMarkWidth: .66,
        // width of paint
        keyWidth: Helpers.chartSettings()[leagueid].keyWidth,
        // locations for key tick marks
        // [11, 14, 17] college
        // [7, 8, 11, 14] nba
        keyMarks: Helpers.chartSettings()[leagueid].keyMarks,
        // radius of restricted area
        restrictedCircleRadius: 4,
        // baseline where three point line becomes circular
        // 9.865 college
        // 14 nba
        threePointCutoffLength: Helpers.chartSettings()[leagueid].threePointCutoffLength,
        // three point line from basket
        // 22.146 college
        // 23.75 nba
        threePointRadius: Helpers.chartSettings()[leagueid].threePointRadius,
        // corner three point line from basket
        // 21.5 college
        // 22 nba
        threePointSideRadius: Helpers.chartSettings()[leagueid].threePointSideRadius,
        // width of svg
        width: 800,
        // floater range
        floaterRange: 14.18,
        // rim zone
        rimRange: 5,
        // convert to proper x-y coordinates
        // change the midrange for college vs. nba (should be passed in through the props)
        leftBaselineMidrangeInside: {x: (145.99621 + 250) / 10,
                                        y: 81.94051 / 10},
        rightBaselineMidrangeInside: {x: (-145.99621 + 250) / 10,
                                        y: 81.94051 / 10},
        rightWingMidrangeInside: {x: (68.29851 + 250) / 10,
                                        y: 172.92448 / 10},
        leftWingMidrangeInside: {x: (-68.29851 + 250) / 10,
                                        y: 172.92448 / 10},
        rightFloaterInside: {x: (25.4622 + 250) / 10,
                                        y: 90.53112 / 10},
        leftFloaterInside: {x: (-25.4622 + 250) / 10,
                                y: 90.53112 / 10},
        left3Inside: Helpers.chartSettings()[leagueid].left3Inside,
        right3Inside: Helpers.chartSettings()[leagueid].right3Inside
    }
    }
  }


  // helper function to create an arcs (restricted, 3 point line, free throw circle)
  appendArcPath(base, radius, startAngle, endAngle, translateX, translateY, xyState) {
        // amount of line segments for the arc
        var points = 1500;
        var a = d3.scaleLinear()
            .domain([0, points - 1])
            .range([startAngle, endAngle])

        var temp = []
        var line = d3.lineRadial()
            .radius(radius)
            .angle(function(d, i) {
              // stash the angle and radius, while they are calculated
              // angle must be rotated...
              // use / 2 because we are in radians not degrees (rotate the angle)
              temp.push({x: translateX + radius * Math.cos(a(i) - Math.PI/2),
                                          y: translateY + radius * Math.sin(a(i) - Math.PI/2)});
              return a(i);
            })

        this.state[xyState] = temp;

        return base.append("path").datum(d3.range(points))
            .attr("d", line);
  }

  // draw basketball court
  drawCourt() {
    var o = this.state.chartSettings;

    var calculateVisibleCourtLength = function () {
          // length of halfcourt
          var halfCourtLength = o.courtLength / 2;
          // length of three point line away from basket
          var threePointLength = o.threePointRadius +
            o.basketProtrusionLength;
          // visible court does not include the entire halfcourt (Heaves not included)
          // can adjust this depending on whether or not we want deep threes included
          o.visibleCourtLength = threePointLength +
            (halfCourtLength - threePointLength) / 2;
    }

    // create visibility dimensions
    calculateVisibleCourtLength()

    const node = this.node
    // create base SVG canvas to draw court on
    var base = d3.select(node)
      .attr('width', o.width)
      .attr('viewBox', "0 0 " + o.courtWidth + " " + o.visibleCourtLength)
      .append('g')
        .attr('class', 'shot-chart-court');
    if (o.height) base.attr('height', o.height);

    // create paint area
    base.append("rect")
      .attr('class', 'shot-chart-court-key')
      .attr("x", (o.courtWidth / 2 - o.keyWidth / 2))
      .attr("y", (o.visibleCourtLength - o.freeThrowLineLength))
      .attr("width", o.keyWidth)
      .attr("height", o.freeThrowLineLength);

    // create baseline
    base.append("line")
      .attr('class', 'shot-chart-court-baseline')
      .attr("x1", 0)
      .attr("y1", o.visibleCourtLength)
      .attr("x2", o.courtWidth)
      .attr("y2", o.visibleCourtLength);


    // create angle for three point arc (tangent - in rads)
    var tpAngle = Math.atan(o.threePointSideRadius /
      (o.threePointCutoffLength - o.basketProtrusionLength - o.basketDiameter/2));

    // create outer three point line
    this.appendArcPath(base, o.threePointRadius, -1 * tpAngle, tpAngle, (o.courtWidth / 2),
      (o.visibleCourtLength - o.basketProtrusionLength - o.basketDiameter / 2), 'threePointLineXY')
        .attr('class', 'shot-chart-court-3pt-line')
        .attr("transform", "translate(" + (o.courtWidth / 2) + ", " +
          (o.visibleCourtLength - o.basketProtrusionLength - o.basketDiameter / 2) +
          ")");



    // create three point line standout
    [1, -1].forEach(function (n) {
      base.append("line")
        .attr('class', 'shot-chart-court-3pt-line')
        .attr("x1", o.courtWidth / 2 + o.threePointSideRadius * n)
        .attr("y1", o.visibleCourtLength - o.threePointCutoffLength)
        .attr("x2", o.courtWidth / 2 + o.threePointSideRadius * n)
        .attr("y2", o.visibleCourtLength);
    });

    // restricted circle
    this.appendArcPath(base, o.restrictedCircleRadius, -1 * Math.PI/2, Math.PI/2, (o.courtWidth / 2),
      (o.visibleCourtLength - o.basketProtrusionLength - o.basketDiameter / 2), 'restrictedAreaXY')
        .attr('class', 'shot-chart-court-restricted-area')
        .attr("transform", "translate(" + (o.courtWidth / 2) + ", " +
          (o.visibleCourtLength - o.basketProtrusionLength - o.basketDiameter / 2) + ")");

    // create out of paint free throw circle
    this.appendArcPath(base, o.freeThrowCircleRadius, -1 * Math.PI/2, Math.PI/2, (o.courtWidth / 2),
        (o.visibleCourtLength - o.freeThrowLineLength), 'ftOutXY')
      .attr('class', 'shot-chart-court-ft-circle-top')
      .attr("transform", "translate(" + (o.courtWidth / 2) + ", " +
        (o.visibleCourtLength - o.freeThrowLineLength) + ")");

    // create in paint free throw circle (dashed - css)

    if (o.league == 'nba'){
      this.appendArcPath(base, o.freeThrowCircleRadius, Math.PI/2, 1.5 * Math.PI)
        .attr('class', 'shot-chart-court-ft-circle-bottom')
        .attr("transform", "translate(" + (o.courtWidth / 2) + ", " +
          (o.visibleCourtLength - o.freeThrowLineLength) + ")");
    } else if (o.league == 'coll') {
      // lane block (college)
      base.append("rect")
        .attr('class', 'shot-chart-court-key-block')
        .attr("x", (o.courtWidth / 2) - (o.keyWidth / 2) - .66)
        .attr("y", o.visibleCourtLength - 7)
        .attr("width", .66)
        .attr("height", 1)
        .style('fill', 'black');

      base.append("rect")
        .attr('class', 'shot-chart-court-key-block')
        .attr("x", (o.courtWidth / 2) + (o.keyWidth / 2))
        .attr("y", o.visibleCourtLength - 7)
        .attr("width", .66)
        .attr("height", 1)
        .style('fill', 'black');
    }

    // box marks for key
    o.keyMarks.forEach(function (mark) {
      [1, -1].forEach(function (n) {
        base.append("line")
          .attr('class', 'shot-chart-court-key-mark')
          .attr("x1", o.courtWidth / 2 + o.keyWidth / 2 * n + o.keyMarkWidth * n)
          .attr("y1", o.visibleCourtLength - mark)
          .attr("x2", o.courtWidth / 2 + o.keyWidth / 2 * n)
          .attr("y2", o.visibleCourtLength - mark)
      });
    });

    // create backboard
    base.append("line")
      .attr('class', 'shot-chart-court-backboard')
      .attr("x1", o.courtWidth / 2 - o.basketWidth / 2)
      .attr("y1", o.visibleCourtLength - o.basketProtrusionLength)
      .attr("x2", o.courtWidth / 2 + o.basketWidth / 2)
      .attr("y2", o.visibleCourtLength - o.basketProtrusionLength)

    // create rim
    base.append("circle")
      .attr('class', 'shot-chart-court-hoop')
      .attr("cx", o.courtWidth / 2)
      .attr("cy", o.visibleCourtLength - o.basketProtrusionLength - o.basketDiameter / 2)
      .attr("r", o.basketDiameter / 2)
    }

  componentDidMount() {
    this.drawCourt();
  }

  componentDidUpdate() {
    this.drawCourt();
  }

  clicked = (evt) => {
    // get click, convert to viewbox coordinates
    const [x, y] = [evt.clientX, evt.clientY];
    const svg = document.getElementById('court-diagram');
    const pt = svg.createSVGPoint();
    pt.x = x;
    pt.y = y;
    const svgP = pt.matrixTransform(svg.getScreenCTM().inverse());
    this.setState((state, props) => {
      return {current_x: svgP.x, current_y: svgP.y, circle_show: true}
    }); 
  }  

  render() {
    console.log(this.state['current_x'], this.state['current_y'])
    return <div style={{width: '50%', display: "flex", margin: 'auto'}}>
        <svg id="court-diagram" ref={node => this.node = node} onClick={this.clicked}>
            {this.state.circle_show ? 
              <g><circle fill="red" r="2%" cx={this.state['current_x']} cy={this.state['current_y']}/></g> : null}
        </svg>
    </div>
  }
}