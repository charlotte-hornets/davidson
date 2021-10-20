import React from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';


export default function TeamSelection(props) {
  return (
  <div className="team-select">
      <h4>{props.name}</h4>
      <TextField
        select
        label="Select"
        fullWidth
        onChange={(event) => {
          props.changeTeam(event.target.value);
        }}
      >
        {props.teams.map((option) => (
          <MenuItem key={option.teamname} value={option.teamid}>
            {option.teamname}
          </MenuItem>
        ))}
      </TextField>
  </div>);
}