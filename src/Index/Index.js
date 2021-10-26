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
          })
        }).catch(err => {
          console.log(err);
        });
    }, []);

    const [team1, setTeam1] = React.useState("")
    const [team1Players, setTeam1Players] = React.useState([])
    const updateTeam1 = (newTeam) => {
        setTeam1(newTeam)
        if (newTeam !== "") {
        Helpers.getFetch('/team/roster?teamid=' + newTeam + '&seasonyear=2021')
        .then(res => {
          res.json().then(data => {
            setTeam1Players(data);
            console.log(team1);
          })
        }).catch(err => {
          console.log(err);
        }) } else {
            setTeam1Players([])
        }
      }

    const [team2, setTeam2] = React.useState("");
    const [team2Players, setTeam2Players] = React.useState([])
    const updateTeam2 = (newTeam) => {
        setTeam2(newTeam)
        if (newTeam !== "") {
        Helpers.getFetch('/team/roster?teamid=' + newTeam + '&seasonyear=2021')
        .then(res => {
        res.json().then(data => {
            setTeam2Players(data);
            console.log(team2);
        })
        }).catch(err => {
            console.log(err);
        }) } else {
            setTeam2Players([])
        }
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

    const [secondRequired, setSecondRequired] = React.useState(true)
    const [sessionType, setSessionType] = React.useState("game")
    const handleSessionTypeChange = (event) => {
        setSessionType(event.target.value)
        event.target.value === "game" ? setSecondRequired(true) : setSecondRequired(false);
    }

    const newSessionSubmitButton = (team1 !== "" && (secondRequired ? team2 !== "": true) && sessionName !== "") ? (
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
        </Link>) : (
        <Button
            variant="contained"
            color="error"
            onClick={() => {
                // run  the form validation logic here & display an error message if anything is missing
                // console.log([selected, checked, props.x_coord, props.y_coord]);
                setAlert({show: true})
                console.log(checked, sessionName);
            }
        }
        >Submit</Button>)



    const newSession = <div>
            <TextField
                id="session-name"
                label="Session Name"
                variant="standard"
                required
                color="error"
                onChange={handleNameChange}
            />
            <div className="team-selection">
                <TeamSelection name="Home/Neutral" teams={teams} required={true} changeTeam={updateTeam1}></TeamSelection>
                <TeamSelection name="Away/Neutral" teams={teams} required={secondRequired} changeTeam={updateTeam2}></TeamSelection>
            </div>
            <div className="session-type">
            <RadioGroup
                aria-label="Session Type"
                defaultValue="game"
                name="session-select-group"
                onChange={handleSessionTypeChange}
            >
                <FormControlLabel value="game"  control={<Radio color="error"/>} label="Game" />
                <FormControlLabel value="scrimmage" control={<Radio color="error"/>} label="Scrimmage" />
                <FormControlLabel value="practice" control={<Radio color="error"/>} label="Practice/Shoot Around" />
            </RadioGroup>
            </div>
            {newSessionSubmitButton}
        </div>
    console.log(team1, team2)
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
            {alert.show ? <Popup header={"Error"} closePopup={() => setAlert({show: false})}
                content={sessionName === "" ? <p>Please provide a session name.</p> : team1 === "" ? <p>Please provide a team in the first box</p> : <p>Please provide a team in the second box</p>}
                showClose={true}/> : null}
        </div>
    ) : <p>Loading...</p>
}
