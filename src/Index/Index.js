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

export default function Index(props) {
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
            state: {sessionID: sessionName}
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

    return (
    
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
                content={<p>No shooter selected.</p>} showClose={true}/> : null}
        </div>
    )
}