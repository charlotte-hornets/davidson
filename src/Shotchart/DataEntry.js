import React from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { InputLabel } from "@material-ui/core";
import Popup from "./Popup";
import { useState } from "react";



export default function DataEntry(props) {
    let options = props.players.map(player => {
      return({label: ("#" + player['jersey'] + " " + player['personname'] + " (" + player['teamname'] + ")"), value: player['personid']});
    });

    let values = {}

    const [alert, setAlert] = useState({show: false});

    const [selected, setSelected] = React.useState("")
    const handleSelectChange = (event) =>{
      setSelected(event.target.value)
    }

    const [wasMade, setWasMade] = React.useState("1");
    const handleWasMadeChange = (event) => {
      setWasMade(event.target.value);
    };

    const [contested, setContested] = React.useState("1");
    const handleContestedChange = (event) =>{
      setContested(event.target.value)
    }

    const [shotType, setShotType] = React.useState("1");
    const handleSelectShotType = (event) =>{
      setShotType(event.target.value)
    }

    return (
        <div>
            <div className="data-entry">
                <FormControl required fullWidth>
                    <InputLabel id="shooter-selection">Shooter</InputLabel>
                    <Select 
                        id="shooter-selection"
                        label="Select"
                        value={selected}
                        onChange={handleSelectChange}
                    >
                    {options.map((option) => (
                        <MenuItem key={option.label} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            <div className="top-question">
                <div className="shot-made">
                    <h4>Shot Made?</h4>
                </div>
                <div className="shot-made">
                    <RadioGroup 
                        aria-label="made?"
                        defaultValue="1"
                        name="made-missed"
                        onChange={handleWasMadeChange}
                    >
                        <FormControlLabel value="1" control={<Radio color="error" />} label="Made" />
                        <FormControlLabel value="0" control={<Radio color="error" />} label="Missed" />
                    </RadioGroup>
                </div>
            </div>
            <div className="top-question">
                <div className="contest">
                    <h4>Shot Contest?</h4>
                </div>
                <div className="contest">
                    <RadioGroup 
                        aria-label="contested?"
                        defaultValue="1"
                        name="contested"
                        onChange={handleContestedChange}
                    >
                        <FormControlLabel value="1" control={<Radio color="error" />} label="Contested" />
                        <FormControlLabel value="0" control={<Radio color="error" />} label="Uncontested" />
                    </RadioGroup>
                </div>
            </div>

            <div className="bottom-question">
                <div className="shot-type">
                    <h4>Shot Type:</h4>
                </div>
                <div className="shot-type">
                    <RadioGroup 
                        row
                        aria-label="contested?"
                        defaultValue="1"
                        name=""
                        onChange={handleSelectShotType}
                    >
                        <FormControlLabel value="1" control={<Radio color="error" />} label="Layup/Dunk" />
                        <FormControlLabel value="2" control={<Radio color="error" />} label="Dribble Jumper" />
                        <FormControlLabel value="3" control={<Radio color="error" />} label="Catch and Shoot" />
                        <FormControlLabel value="4" control={<Radio color="error" />} label="Runner/Floater" />
                        <FormControlLabel value="5" control={<Radio color="error" />} label="Post Move" />
                    </RadioGroup>
                </div>
            </div>
            </div>
            <div className="submit-button">
                <Button
                    variant="contained"
                    color="error"
                    onClick={() => {
                        // run  the form validation logic here & display an error message if anything is missing
                        // console.log([selected, checked, props.x_coord, props.y_coord]);
                        if (selected != "") {
                            values = {
                                playerId: selected, 
                                shotMade: parseInt(wasMade),
                                contested: parseInt(contested),
                                shotType: parseInt(shotType),
                                x_coord: props.x_coord,
                                y_coord: props.y_coord}
                            console.log(values)
                            props.submitData(values);
                            props.showCircle();
                            props.closePopup();
                        } else {
                            setAlert({show: true});
                        }
                    }
                    }
                >Submit</Button>
            </div>
            {alert.show ? <Popup header={"Error"} closePopup={() => setAlert({show: false})} 
                content={<p>No shooter selected.</p>} showClose={true}/> : null}
        </div>
        )
  }
  