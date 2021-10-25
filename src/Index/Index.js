import {Link} from "react-router-dom";
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
import { useEffect } from "react";

export default function Index(props) {
    const [teams, setTeams] = React.useState("")
    useEffect(() => {
        Helpers.getFetch('/team/seasons?leagueid=COLL&seasonyear=2021')
        .then(res => {
          res.json().then(data => {
            setTeams(data);
            console.log(teams);
          })
        }).catch(err => {
          console.log(err);
        });
    }, []);

    const [team1, setTeam1] = React.useState(null)
    const [team1Players, setTeam1Players] = React.useState([])
    const updateTeam1 = (newTeam) => {
        setTeam1(newTeam)
        Helpers.getFetch('/team/roster?teamid=' + newTeam + '&seasonyear=2021')
        .then(res => {
          res.json().then(data => {
            setTeam1Players(data);
            console.log(team1);
          })
        }).catch(err => {
          console.log(err);
        })
      }

    const [team2, setTeam2] = React.useState(null);
    const [team2Players, setTeam2Players] = React.useState([])
    const updateTeam2 = (newTeam) => {
        setTeam2(newTeam)
        Helpers.getFetch('/team/roster?teamid=' + newTeam + '&seasonyear=2021')
        .then(res => {
        res.json().then(data => {
            setTeam2Players(data);
            console.log(team2);
        })
        }).catch(err => {
            console.log(err);
        })
    }


    const [alert, setAlert] = React.useState({show: false});

    const [checked, setChecked] = React.useState(false)
    const handleCheckedChange = (event) =>{
      setChecked(!checked)
    }

    const [sessionName, setSessionName] = React.useState("")
    const handleNameChange = (event) =>{
      setSessionName(event.target.value)
    }

    const newSession =<div>
            <TextField
                id="session-name"
                label="Session Name"
                variant="standard"
                required
                color="error"
                onChange={handleNameChange}
            />
            <div className="session-type">
            <div className="team-selection">
                <TeamSelection name="Home/Neutral" teams={teams} changeTeam={updateTeam1}></TeamSelection>
                <TeamSelection name="Away/Neutral" teams={teams} changeTeam={updateTeam2}></TeamSelection>
            </div>
            <RadioGroup 
                aria-label="Session Type"
                defaultValue="game"
                name="session-select-group"
            >
                <FormControlLabel value="game"  control={<Radio color="error"/>} label="Game" />
                <FormControlLabel value="scrimmage" control={<Radio color="error"/>} label="Scrimmage" />
                <FormControlLabel value="practice" control={<Radio color="error"/>} label="Practice/Shoot Around" />
            </RadioGroup>
            </div>
        </div>

    const submitButton = (
        <Link to={{
            pathname: "/shotchart",
            state: {
                sessionID: sessionName,
                players: team1Players.concat(team2Players),
                team1: team1,
                team2: team2
            }
        }}>
        <Button
            variant="contained"
            color="error"
            onClick={() => {
                // run  the form validation logic here & display an error message if anything is missing
                // console.log([selected, checked, props.x_coord, props.y_coord]);
                console.log(checked, sessionName);
            }
        }
        >Submit</Button>
        </Link>)

    return teams.length ? (
        <div className="session-manager">
            <h1>Davidson Basketball Shot Charts</h1>
            <p>To start or continue a session, please fill in the required information below:</p>
            <FormGroup>
                <FormControlLabel control={<Checkbox checked={checked} onChange={() => {
                    handleCheckedChange();
                    setSessionName("")
                    }
                    } color="error"/>} label="New Session" />
            </FormGroup>
            {checked ? newSession : null}
            {sessionName != "" ? submitButton : null}
            {alert.show ? <Popup header={"Error"} closePopup={() => setAlert({show: false})} 
                content={<p>Form validation thing.</p>} showClose={true}/> : null}
        </div>
    ) : <p>Loading...</p>
}