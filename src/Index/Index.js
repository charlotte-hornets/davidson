import React from "react";
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Popup from "../Shotchart/Popup";
import TeamSelection from "./TeamSelect";
import Helpers from '../Utils/Helpers.js';
import { Grid, MenuItem, Typography } from "@material-ui/core";
import { useEffect } from "react";
import LoadingPage from "../PageTemplates/LoadingPage";
import { Box } from "@material-ui/system";
import { FormControl } from "@material-ui/core"

let statesLoaded = 0;
let statesNeeded = 2;

export default function Index() {
    const [teams, setTeams] = React.useState("")
    const [sessions, setSessions] = React.useState([])
    
    useEffect(() => {
      Helpers.getFetch('/davidson/sessions')
      .then(res => {
        res.json().then(data => {
          statesLoaded++;
          setSessions(data.reverse());
        })
      }).catch(err => {
        console.log(err);
      });

      Helpers.getFetch('/teams?seasonyear=2021&leagueid=COLL&leaguelevel=NCAA1')
        .then(res => {
          res.json().then(data => {
            statesLoaded++;
            setTeams(data);
            console.log(data);
          })
        }).catch(err => {
          console.log(err);
        });

        
    }, []);


    const [secondRequired, setSecondRequired] = React.useState(true)
    const [sessionType, setSessionType] = React.useState("game")
    const handleSessionTypeChange = (event) => {
        setSessionType(event.target.value)
        checked && event.target.value === "game" ? setSecondRequired(true) : setSecondRequired(false);
    }

    const [team1, setTeam1] = React.useState()
    const updateTeam1 = (newTeam) => {
      setTeam1(parseInt(newTeam))
    }

    const [team2, setTeam2] = React.useState();
    const updateTeam2 = (newTeam) => {
      setTeam2(parseInt(newTeam))
    }

    const [alert, setAlert] = React.useState({show: false});

    const [sessionName, setSessionName] = React.useState("")
    const handleNameChange = (event) =>{
      setSessionName(event.target.value)
    }

    const [currentSession, setCurrentSession] = React.useState({})
    const handleSessionChange = (event) => {
      setCurrentSession(event.target.value);
      setSessionName(event.target.value.name);
    }

    const [checked, setChecked] = React.useState(false)
    const handleCheckedChange = () => {
      setChecked(!checked);
      setCurrentSession({});
    }

    const SubmitButton = () => {
      if (checked) {
        return <Button variant="contained" color="primary" onClick={() => {
            Helpers.postFetch("/davidson/sessions", JSON.stringify([{
              name: sessionName, 
              dateadded: new Date(), 
              creator: 'Michael', 
              sessiontype: sessionType, 
              teamseasonid_1: team1, 
              teamseasonid_2: team2}]))
            .then(res => {
              if (res.status !== 201) {
                console.log('error with post fetch');
              } else {
                res.json().then(data => {
                  const sessionid = "sessionid=" + data[0].sessionid;
                  const firstTeam = "team1=" + team1
                  const secondTeam = "team2=" + team2
                  window.location = "/shotchart?" + sessionid + "&" + firstTeam + "&" + secondTeam;
                })
                console.log("posted");
              }
            }).catch(err => {
              console.log(err);
            });
          }}
        >Submit</Button>
      } else {
        return <Button variant="contained" color="primary" onClick={() => {
          console.log(currentSession.sessionid);
          if (currentSession.sessionid === undefined) {
            setAlert({show: true});
          } else {
          // run  the form validation logic here & display an error message if anything is missing
          // console.log([selected, checked, props.x_coord, props.y_coord]);
            //window.location = '/shotchart?sessionid=' + sessionId;
            const sessionid = "sessionid=" + currentSession.sessionid
            const firstTeam = "team1=" + currentSession.teamseasonid_1
            const secondTeam = "team2=" + currentSession.teamseasonid_2
            window.location = "/shotchart?" + sessionid + "&" + firstTeam + "&" + secondTeam;
          }
        }}>Submit</Button>
      }
    }

    
    const resumeSession = (
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <FormControl fullWidth>
            <TextField fullWidth required select defaultValue="" label="Select" onChange={handleSessionChange}>
              {sessions.map((option) => (
                <MenuItem key={option.sessionid} value={option}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
          </FormControl>
        </Grid>
        <Grid item xs={9}/>
        <Grid item xs={12}>
          <div className="session-submit-button">
            {SubmitButton()}
          </div>
        </Grid>
      </Grid>
    )

    const newSession = (
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField id="session-name" label="Session Name" variant="standard" required onChange={handleNameChange}/>
        </Grid>
        <Grid item xs={8} sm={3} className="team-selection">
            <TeamSelection className="team-select" label="Home/Neutral" teams={teams} required={true} changeTeam={updateTeam1}></TeamSelection>
        </Grid>
        <Grid item xs={8} sm={3}>
            <TeamSelection className="team-select" label="Away/Neutral" teams={teams} required={secondRequired} changeTeam={updateTeam2}></TeamSelection>
        </Grid>
        <Grid item xs={12} className="session-type">
          <RadioGroup defaultValue="game" aria-label="Session Type" name="session-select-group" onChange={handleSessionTypeChange}>
              <FormControlLabel value="game"  control={<Radio color="primary"/>} label="Game" />
              <FormControlLabel value="scrimmage" control={<Radio color="primary"/>} label="Scrimmage" />
              <FormControlLabel value="practice" control={<Radio color="primary"/>} label="Practice/Shoot Around" />
          </RadioGroup>
        </Grid>
        <Grid item xs={12} className="session-submit-button">
          {SubmitButton()}
        </Grid>
      </Grid>
    )

    return statesLoaded === statesNeeded ? (<Box sx={{p: 2}}>
        <Box sx={{p:2, boxShadow: "rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px", background: "#FFF", borderRadius: 2.5, width: "50%"}}>
        <Grid className="session-manager" container spacing={2}>
          <Grid item xs={12}>
              <Typography variant="h1">SESSION MANAGER</Typography>
          </Grid>
          <Grid item xs={12}>
              <Typography variant="p">To start or continue a session, please fill in the required information below:</Typography>
           </Grid>
           <Grid item xs={12}>
              <FormGroup>
                  <FormControlLabel control={<Checkbox checked={checked} onChange={() => {
                      handleCheckedChange();
                      setSessionName("")
                      }
                      } color="primary"/>} label="New Session" />
              </FormGroup>
            </Grid>
            <Grid item xs={12}>
              {checked ? newSession : resumeSession}
            </Grid>
          </Grid>
              {alert.show ? <Popup header={"Error"} closePopup={() => setAlert({show: false})}
                  content={sessionName === "" ? <p>Please provide a session name.</p> : team1 === "" ? <p>Please provide a team in the first box</p> : <p>Please provide a team in the second box</p>}
                  showClose={true}/> : null}
        </Box></Box>) : <LoadingPage needed={statesNeeded} loaded={statesLoaded}/>
}