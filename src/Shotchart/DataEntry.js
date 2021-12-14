import React from "react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { Grid, Typography } from "@material-ui/core";
import { InputLabel } from "@material-ui/core";
import Popup from "./Popup";
import { useState } from "react";
import { GridOnOutlined } from "@material-ui/icons";



export default function DataEntry(props) {
    let options = props.players.map(player => {
      return({label: (player['personname'] + " #" + player['rosterjerseynumber'] + " (" + player['college'] + ")"), value: player});
    });
    console.log(options)
    

    let values = {}

    const [alert, setAlert] = useState({show: false});

    const [selected, setSelected] = React.useState({})
    const handleSelectChange = (event) =>{
      setSelected(event.target.value)
    }
    console.log(selected);

    const [wasMade, setWasMade] = React.useState("1");
    const handleWasMadeChange = (event) => {
      setWasMade(event.target.value);
    };

    const [contested, setContested] = React.useState("Contested");
    const handleContestedChange = (event) =>{
      setContested(event.target.value)
    }

    const [shotType, setShotType] = React.useState("Layup/Dunk");
    const handleSelectShotType = (event) =>{
      setShotType(event.target.value)
    }

    const [round, setRound] = React.useState(props.round);
    const handleRoundChange = (event) => {
        setRound(event.target.value)
    }

    return (<div>
        <Grid className="data-entry" container spacing={2}>
            <Grid item xs={12}>
                <FormControl required fullWidth>
                    <InputLabel id="shooter-selection">Shooter</InputLabel>
                    <Select id="shooter-selection" label="Select" value={selected} onChange={handleSelectChange}>
                    {options.map((option) => (
                        <MenuItem key={option.label} value={option.value}>
                        {option.label}
                        </MenuItem>
                    ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <FormControl required fullWidth>
                    <InputLabel id="round-selection">Round</InputLabel>
                    <Select id="round-selection" label="Select" value={round} onChange={handleRoundChange}>
                        <MenuItem key={"round-1"} value={1}>{1}</MenuItem>
                        <MenuItem key={"round-2"} value={2}>{2}</MenuItem>
                        <MenuItem key={"round-3"} value={3}>{3}</MenuItem>
                        <MenuItem key={"round-4"} value={4}>{4}</MenuItem>
                        <MenuItem key={"round-5"} value={5}>{5}</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
            <Grid item sm={6} xs={12}>
                <div>
                    <Typography variant="p" style={{fontWeight: 700}}>SHOT MADE</Typography>
                </div>
                <div>
                    <RadioGroup aria-label="made?" defaultValue="1" name="made-missed" onChange={handleWasMadeChange}>
                        <FormControlLabel value="1" control={<Radio color="primary" />} label="Made" />
                        <FormControlLabel value="0" control={<Radio color="primary" />} label="Missed" />
                    </RadioGroup>
                </div>
            </Grid>
            <Grid item sm={6} xs={12}>
                <div>
                    <Typography variant="p" style={{fontWeight: 700}}>SHOT CONTEST</Typography>
                </div>
                <div>
                    <RadioGroup aria-label="contested?" defaultValue="Contested" name="contested" onChange={handleContestedChange}>
                        <FormControlLabel value="Contested" control={<Radio color="primary" />} label="Contested" />
                        <FormControlLabel value="Uncontested" control={<Radio color="primary" />} label="Uncontested" />
                    </RadioGroup>
                </div>
            </Grid>

            <Grid item sm={12}>
                <div>
                    <Typography variant="p" style={{fontWeight: 700}}>SHOT TYPE</Typography>
                </div>
                <div>
                    <RadioGroup row aria-label="contested?" defaultValue="Layup/Dunk" name="" onChange={handleSelectShotType}>
                        <FormControlLabel value="Layup/Dunk" control={<Radio color="primary" />} label="Layup/Dunk" />
                        <FormControlLabel value="Dribble Jumper" control={<Radio color="primary" />} label="Dribble Jumper" />
                        <FormControlLabel value="Catch and Shoot" control={<Radio color="primary" />} label="Catch and Shoot" />
                        <FormControlLabel value="Runner/Floater" control={<Radio color="primary" />} label="Runner/Floater" />
                        <FormControlLabel value="Post Move" control={<Radio color="primary" />} label="Post Move" />
                    </RadioGroup>
                </div>
            </Grid>
        </Grid>
        <Button variant="contained" color="primary" onClick={() => {
            // run  the form validation logic here & display an error message if anything is missing
            // console.log([selected, checked, props.x_coord, props.y_coord]);
                if (selected !== "") {
                    values = {
                        playerid: selected.personid,
                        teamseasonid: selected.teamseasonid, 
                        shotMade: parseInt(wasMade),
                        contested: contested,
                        shotType: shotType,
                        x_coord: props.x_coord,
                        y_coord: props.y_coord,
                        round: round
                    }
                    console.log(values.teamseasonid)
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

        {alert.show ? <Popup header={"Error"} closePopup={() => setAlert({show: false})} 
        content={<p>No shooter selected.</p>} showClose={true}/> : null}
        </div>
        )
  }
  