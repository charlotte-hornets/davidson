import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

const sample_roster = [
    {playerName: "Stephen Curry", playerId: "stcurry01", number: "30", team:"Warriors"},
    {playerName: "Lebron James", playerId: "lejames01", number: "23", team:"Lakers"},
    {playerName: "LaMelo Ball", playerId: "laball01", number: "2", team:"Hornets"}
  ]  

export default function DataEntry(props) {
    let options = sample_roster.map(player => {
      return({label: ("#" + player['number'] + " " + player['playerName'] + " (" + player['team'] + ")"), value: player['playerId']});
    });

    let values = {}

    const [wasMade, setWasMade] = React.useState(null);
    const handleWasMadeChange = (event) => {
      setWasMade(event.target.value);
    };

    const [selected, setSelected] = React.useState(null)
    const handleSelectChange = (event) =>{
      setSelected(event.target.value)
    }

    const [contested, setContested] = React.useState(null)
    const handleContestedChange = (event) =>{
      setContested(event.target.value)
    }

    const [shotType, setShotType] = React.useState(null)
    const handleSelectShotType = (event) =>{
      setShotType(event.target.value)
    }

    const useStyles = makeStyles((theme) => ({
      root: {
        '& > *': {
          margin: theme.spacing(1),
        },
      },
    }));
    const classes= useStyles();


    return (
        <div>
            <div>
                <h4>Shooter:</h4>
                <Select 
                    id="shooter-selection"
                    select
                    fullWidth
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
            </div>
            <div class="top-question">
                <div class="shot-made">
                    <h4>Shot Made?</h4>
                </div>
                <div class="shot-made">
                    <RadioGroup 
                        aria-label="made?"
                        defaultValue="1"
                        name="made-missed"
                        onChange={handleWasMadeChange}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Made" />
                        <FormControlLabel value="0" control={<Radio />} label="Missed" />
                    </RadioGroup>
                </div>
            </div>
            <div class="top-question">
                <div class="contest">
                    <h4>Shot Contest?</h4>
                </div>
                <div class="contest">
                    <RadioGroup 
                        aria-label="contested?"
                        defaultValue="1"
                        name="contested"
                        onChange={handleContestedChange}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Contested" />
                        <FormControlLabel value="0" control={<Radio />} label="Uncontested" />
                    </RadioGroup>
                </div>
            </div>

            <div class="bottom-question">
                <div class="shot-type">
                    <h4>Shot Type:</h4>
                </div>
                <div class="shot-type">
                    <RadioGroup 
                        row
                        aria-label="contested?"
                        defaultValue="1"
                        name=""
                        onChange={handleSelectShotType}
                    >
                        <FormControlLabel value="1" control={<Radio />} label="Layup/Dunk" />
                        <FormControlLabel value="2" control={<Radio />} label="Dribble Jumper" />
                        <FormControlLabel value="3" control={<Radio />} label="Catch and Shoot" />
                        <FormControlLabel value="4" control={<Radio />} label="Runner/Floater" />
                        <FormControlLabel value="5" control={<Radio />} label="Post Move" />
                    </RadioGroup>
                </div>
            </div>


            <div class="submit-button">
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => {
                        // console.log([selected, checked, props.x_coord, props.y_coord]);
                        values = {
                            playerId: selected, 
                            shotMade: wasMade,
                            contested: contested,
                            shotType: shotType,
                            x_coord: props.x_coord,
                            y_coord: props.y_coord}
                        props.submitData(values);
                        props.closePopup();
                    }
                    }
                >Submit</Button>
            </div>
        </div>
        )
  }
  