import React, {useState} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';

const sample_roster = [
  {playerName: "Stephen Curry", playerId: "stcurry01", number: "30", team:"Warriors"},
  {playerName: "Lebron James", playerId: "lejames01", number: "23", team:"Lakers"},
  {playerName: "LaMelo Ball", playerId: "laball01", number: "2", team:"Hornets"}
]

export default function Popup(props) {

  let options = sample_roster.map(player => {
      return({label: ("#" + player['number'] + " " + player['playerName'] + " (" + player['team'] + ")"), value: player['playerId']});
  });

  let dict = {};
  const [counter, setCounter] = React.useState(1);
  const incrementCounter = () => setCounter(counter + 1);
  let values = [];

  const [checked, setChecked] = React.useState(true);

  const handleCheckChange = (event) => {
    setChecked(event.target.checked);
  };

  const [selected, setSelected] = React.useState(null)

  const handleSelectChange = (event) =>{
    setSelected(event.target.value)
  }

  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

  const classes= useStyles();

  return <div className='popup'>
      <div className='popup_inner'>
        {props.showClose == false ? null : <span onClick={props.closePopup} className='close-button'>x</span>}
        <div>
          <h2>{props.header}</h2>
        </div>

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

        <div>
          <div class="shot-made">
            <h4>Shot Made? </h4>
          </div>
          <div class="shot-made">
            <Checkbox
              value={true}
              id="shot-made-check"
              color="primary"
              checked={checked}
              onChange={handleCheckChange}
            >
            </Checkbox>
          </div>
        </div>

        <div class="submit-button">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              // console.log([selected, checked, props.x_coord, props.y_coord]);
              values = [selected, checked, props.x_coord, props.y_coord];
              incrementCounter();
              dict[counter] = values;
              console.log(counter);
              console.log(dict);
              props.closePopup();
            }}>
            Submit
          </Button>
        </div>

      </div>



  </div>
};
