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
import { MenuItem } from "@material-ui/core";
import { useEffect } from "react";
import LoadingPage from "../PageTemplates/LoadingPage";
import Navbar from "../ComponentTemplates/Navbar";

let statesLoaded = 0;
let statesNeeded = 2;

export default function Index(props) {
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

      Helpers.getFetch('/team/seasons?leagueid=COLL&seasonyear=2021')
        .then(res => {
          res.json().then(data => {
            statesLoaded++;
            setTeams(data);
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

    const newSessionSubmitButton = (
        <Button variant="contained" color="error" onClick={() => {
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
    )

    const resumeSessionSubmit = (
      <Button variant="contained" color="error" onClick={() => {
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
      }}>Submit</Button>)

    
    const resumeSession = (
      <div>
        <div className="select">
            <TextField fullWidth required select defaultValue="" label="Select" onChange={handleSessionChange}>
              {sessions.map((option) => (
                <MenuItem key={option.sessionid} value={option}>
                  {option.name}
                </MenuItem>
              ))}
          </TextField>
        </div>
        <div className="session-submit-button">
          {resumeSessionSubmit}
        </div>
      </div>
    )

    const newSession = (
      <div>
        <TextField id="session-name" label="Session Name" variant="standard" required color="error" onChange={handleNameChange}/>
        <div className="team-selection">
            <TeamSelection name="Home/Neutral" teams={teams} required={true} changeTeam={updateTeam1}></TeamSelection>
            <TeamSelection name="Away/Neutral" teams={teams} required={secondRequired} changeTeam={updateTeam2}></TeamSelection>
        </div>
        <div className="session-type">
          <RadioGroup defaultValue="game" aria-label="Session Type" name="session-select-group" onChange={handleSessionTypeChange}>
              <FormControlLabel value="game"  control={<Radio color="error"/>} label="Game" />
              <FormControlLabel value="scrimmage" control={<Radio color="error"/>} label="Scrimmage" />
              <FormControlLabel value="practice" control={<Radio color="error"/>} label="Practice/Shoot Around" />
          </RadioGroup>
        </div>
        <div className="session-submit-button">
          {newSessionSubmitButton}
        </div>
      </div>
    )

    console.log(statesLoaded, statesNeeded)
    return statesLoaded === statesNeeded ? (<div>
        <Navbar/>
        <div className="session-manager">
            <h1>Davidson Basketball Shot Charts</h1>
            <p>To start or continue a session, please fill in the required information below:</p>
            <FormGroup className="session-checkbox">
                <FormControlLabel control={<Checkbox checked={checked} onChange={() => {
                    handleCheckedChange();
                    setSessionName("")
                    }
                    } color="error"/>} label="New Session" />
            </FormGroup>
            {checked ? newSession : resumeSession}
            {alert.show ? <Popup header={"Error"} closePopup={() => setAlert({show: false})}
                content={sessionName === "" ? <p>Please provide a session name.</p> : team1 === "" ? <p>Please provide a team in the first box</p> : <p>Please provide a team in the second box</p>}
                showClose={true}/> : null}
        </div>
        </div>) : <LoadingPage needed={statesNeeded} loaded={statesLoaded}/>
}


    /*
    if (newTeam !== "") {
      Helpers.getFetch('/team/roster?teamid=' + newTeam + '&seasonyear=2021')
      .then(res => {
      res.json().then(data => {
          setTeam2Players(data);
          setTeam2(parseInt(newTeam));
      })
      }).catch(err => {
          console.log(err);
      }) } else {
          setTeam2Players([])
      }
      */