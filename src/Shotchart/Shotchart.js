import React, { Component } from "react";
import * as d3 from 'd3'
import Helpers from '../Utils/Helpers.js';
import Popup from "./Popup.js";
import DataEntry from "./DataEntry.js";
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Undo from "./Undo.js";
import LoadingPage from "../PageTemplates/LoadingPage.js";
import Sidebar from "../ComponentTemplates/Sidebar";
import LatestShot from "./LatestShot.js";
import Navbar from "../ComponentTemplates/Navbar"
import { Card, CardContent, Grid, Box, Tooltip } from "@material-ui/core";
import { textAlign } from "@material-ui/system";
import { Typography } from "@material-ui/core";
import StatCard from "../ComponentTemplates/StatCard.js";



export default class Shotchart extends Component {
  constructor(props) {
    super(props);
    var leagueid = 'coll';
    this.state = {
        // loading and loading check variables
        statesLoaded: 0,
        statesNeeded: 2,
        // validation of valid session info
        hasSessionInfo: true,
        // session info
        sessionid: null,
        team1: null,
        team2: null,
        players: [],
        // circle display
        multipleShotView: false,
        circle_show: false,
        // form info
        popupShow: false,
        // values to pass into DataEntry
        current_x: "N/A",
        current_y: "N/A",
        current_round: 1,
        // data on latest shot
        latest_shot: {"x": null, "y": null},
        shotList: [],
        sessionFGA: 0,
        sessionFGM: 0,
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

    if (o.league === 'nba'){
      this.appendArcPath(base, o.freeThrowCircleRadius, Math.PI/2, 1.5 * Math.PI)
        .attr('class', 'shot-chart-court-ft-circle-bottom')
        .attr("transform", "translate(" + (o.courtWidth / 2) + ", " +
          (o.visibleCourtLength - o.freeThrowLineLength) + ")");
    } else if (o.league === 'coll') {
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
    // grab our players and teams for selecting a shot
    // next steps: call the player API when a team is selected
    // /players?teamid={teamid}
    
    this.updateSessionInfo();

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    if(urlParams.get('team2') !== "" && urlParams.get('team2') !== "null") {
      this.setState({statesNeeded: this.state.statesNeeded+1})
    }

    if (urlParams.has('team1') && urlParams.has('sessionid')) {
      if (urlParams.get('team1') !== "null"){
        Helpers.getFetch('/team/roster?teamid=' + urlParams.get('team1') + '&seasonyear=2021')
          .then(res => {
          res.json().then(data => {
              this.setState({players: data})
              this.setState({statesLoaded: this.state.statesLoaded + 1})
          })
          }).catch(err => {
              console.log(err);
              window.location = '/';
          })
      }
      
      if (urlParams.get('sessionid') !== "null"){
        Helpers.getFetch('/davidson/shots?sessionid='+urlParams.get('sessionid'))
        .then(res => {
        res.json().then(data => {
          if (data.length !== 0){
            this.setState({
              statesLoaded: this.state.statesLoaded + 1, 
              shotList: data, 
              latest_shot: data.slice(-1).pop(),
              circle_show: true
            })
            this.updateStats();
          } else {
            this.setState({
              statesLoaded: this.state.statesLoaded + 1,
              circle_show: false
            })
          }
        })
        }).catch(err => {
            console.log(err);
            window.location = '/';
        })
      }

      if (urlParams.get('team2') !== "" && urlParams.get('team2') !== "null") {
        Helpers.getFetch('/team/roster?teamid=' + urlParams.get('team2') + '&seasonyear=2021')
          .then(res => {
          res.json().then(data => {
              this.setState({players: this.state.players.concat(data)})
              this.setState({statesLoaded: this.state.statesLoaded + 1})
          })
          }).catch(err => {
              console.log(err);
              window.location = '/';
          })
      }
    } else {
      window.location = '/'
    }
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
    this.setState(() => {
      return {current_x: svgP.x, current_y: svgP.y, popupShow: true}
    });
  }
  
  closeEntry = () => {
    this.setState(() => {
      return {popupShow: false}
    })
  }

  updateStats = () => {
    console.log("called")
    const shotsTaken = this.state.shotList.length;
    if (shotsTaken === 0) {
    } else {
      let sum = 0
      this.state.shotList.forEach(item => {
        sum = sum + item.make}
      )
      this.setState({
        sessionFGA: this.state.shotList.length,
        sessionFGM: sum
      })
      console.log(this.state.sessionFGA, this.state.sessionFGM)
    }
  }

  submitShotList = (newData) => {
    this.setState({current_round: newData.round});
    Helpers.postFetch("/davidson/shots", JSON.stringify([{
      sessionid: parseInt(this.state.sessionid),
      teamseasonid: newData.teamseasonid,
      playerid: newData.playerid,
      x: newData.x_coord,
      y: newData.y_coord,
      dateadded: new Date(),
      make: newData.shotMade,
      round: newData.round,
      contesttype: newData.contested,
      shottype: newData.shotType
    }]))
    .then(res => {
      if (res.status !== 201) {
        console.log('error with post fetch');
      } else {
        Helpers.getFetch('/davidson/shots?sessionid='+this.state.sessionid)
        .then(res => {
        res.json().then(data => {
          if (data.length !== 0){
            this.setState({
              shotList: data, 
              latest_shot: data.slice(-1).pop(),
            })
            this.setState({circle_show: true});
            this.updateStats();
          } else {
            this.setState({
              circle_show: false
            })
          }
        })
        }).catch(err => {
            console.log(err);
            window.location = '/';
        })
      }
    }).catch(err => {
      console.log(err);
    });
  }

  undoShotList = () => {
    if (this.state.shotList.length !== 0) {
      Helpers.deleteFetch("/davidson/shots", JSON.stringify([this.state.latest_shot]))
      .then(res => {
        if (res.status !== 202) {
          console.log('error with delete fetch');
        } else {
          Helpers.getFetch('/davidson/shots?sessionid='+this.state.sessionid)
            .then(res => {
            res.json().then(data => {
              if (data.length !== 0){
                this.setState({
                  shotList: data, 
                  latest_shot: data.slice(-1).pop(),
                  
                })
                this.setState({circle_show: true});
                this.updateStats();
              } else {
                this.setState({
                  circle_show: false
                })
              }
            })
            }).catch(err => {
                console.log(err);
                window.location = '/';
            })
        }
      }).catch(err => {
        console.log(err);
      });
      

    } else {
      console.log("nothing to undo")
    }
  }

  updateMultipleShot = () => {
    this.setState((pastState) => {
      return {multipleShotView: !pastState.multipleShotView}
    })
  }

  updateCircleShow = () => {
    this.setState(() => {
      return {circle_show: true}
    })
  }

  updateSessionInfo = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    this.setState({
      sessionid: urlParams.get('sessionid'),
      team1: urlParams.get('team1'),
      team2: urlParams.get('team2'),
    })
    if (this.state.team1 === null) {
      this.setState({
        hasSessionInfo: false
      })
    }
  }

  getFGPercent = () => {
    console.log("called")
    const shotsTaken = this.state.shotList.length;
    if (shotsTaken === 0) {
      return "0%"
    } else {
      let sum = 0
      this.state.shotList.forEach(item => {
        sum = sum + item.make}
      )
      console.log(sum / shotsTaken)

    }
  }


  render() {
    // creating circles and tooltip depending on shot view type
    let circles = this.state.multipleShotView ? this.state.shotList.map((shot, index) => 
      <Tooltip title={<React.Fragment>
        <Typography variant="p">Shooter: {shot.personname}</Typography><br/>
        <Typography variant="p">Round: {shot.round}</Typography><br/><Typography variant="p">Shot Type: {shot.shottype}</Typography><br/>
        <Typography variant="p">Shot Contest: {shot.contesttype}</Typography><br/></React.Fragment>}>
        <circle className="shot-circle" key={index+1} fill={shot['make'] === 1 ? "#90BE6D" : "#F94144"} r="1%" cx={shot.x} cy={shot.y}/>
      </Tooltip>
    ) : this.state.circle_show ? (
      <Tooltip title={<React.Fragment>
        <Typography variant="p">Shooter: {this.state.latest_shot.personname}</Typography><br/>
        <Typography variant="p">Round: {this.state.latest_shot.round}</Typography><br/>
        <Typography variant="p">Shot Type: {this.state.latest_shot.shottype}</Typography><br/>
        <Typography variant="p">Shot Contest: {this.state.latest_shot.contesttype}</Typography><br/></React.Fragment>}>
        <circle className="shot-circle" key={this.state.shotList.length+1} fill={this.state.latest_shot['make'] === 1 ? "#90BE6D" : "#F94144"} r="1%" cx={this.state.latest_shot.x} cy={this.state.latest_shot.y}/></Tooltip>
    ) : null;

    if (this.state.statesNeeded=== this.state.statesLoaded) {
      return (
        <Box>
          <Navbar/>
          <Box sx={{p: 2}}>
          <Grid container spacing={2} justifyContent="space-evenly" alignItems="center">
            <Grid item md={7} sm={12}>
              <svg id="court-diagram" style={{width: "100%"}} ref={node => this.node = node} onClick={this.clicked}>{this.state.circle_show ? circles: null}</svg>
              {this.state['popupShow'] ? <Popup header={"SHOT DATA ENTRY"} closePopup={this.closeEntry} content={<DataEntry players={this.state.players} round={this.state.current_round} x_coord={this.state['current_x']} y_coord={this.state['current_y']} submitData={this.submitShotList} showCircle={this.updateCircleShow} closePopup={this.closeEntry} showClose={true}/>} showClose={true}/> : null}
            </Grid>
            <Grid item />
            <Grid item md={4} sm={12} >
            
            <Grid container spacing={4}>
            <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={2} justifyContent="space-around" alignItems="center">
                      <Grid item xs={12}><Typography variant="h2">OPTIONS</Typography></Grid>
                      <Grid item xs={5} style={{textAlign: "center"}}>
                          <FormControlLabel className="display-switch" control={<Switch color="primary" onClick={this.updateMultipleShot} value={this.state.multipleShotView}/>} label="Multiple Shots"/>
                      </Grid>
                      <Grid item/>
                      <Grid item xs={5} style={{textAlign: "center"}}>
                          <Undo undoFunction={this.undoShotList}/>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
                </Grid>
              <Grid item xs={12}>
                <Sidebar header={"LATEST SHOT"} content={<LatestShot data={this.state.latest_shot}/>}/>
              </Grid>
              <Grid item xs={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={1} justifyContent="space-evenly" alignItems="center">
                      <Grid item xs={12}><Typography variant="h2">SESSION STATS</Typography></Grid>
                      <Grid item xs={4}>
                        <StatCard name="FGM" content={this.state.sessionFGM}/>
                      </Grid>
                      <Grid item xs={4}>
                        <StatCard name="FGA" content={this.state.sessionFGA}/>
                      </Grid>
                      <Grid item xs={4}>
                        <StatCard name="FG%" content={(100* this.state.sessionFGM / this.state.sessionFGA).toFixed(1) + "%"}/>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>

              </Grid>
            </Grid>

          </Grid>
          </Box>
        </Box>
      );
    } else {
      return <div>
        <LoadingPage loaded={this.state.statesLoaded} needed={this.state.statesNeeded} />
      </div>
    }
  
  }
}