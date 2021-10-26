import React from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';



export default function TeamSelection(props) {
  console.log(props.required)
  return props.required ? (
  <div className="team-select">
      <h4>{props.name}</h4>
      <TextField
        required
        select
        label="Select"
        fullWidth
        onChange={(event) => {
          props.changeTeam(event.target.value);
        }}
      >
        <MenuItem key={""} value={""}>
            {""}
        </MenuItem>
        {props.teams.map((option) => (
          <MenuItem key={option.teamname} value={option.teamid}>
            {option.teamname}
          </MenuItem>
        ))}
      </TextField>
  </div>) : (
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
        <MenuItem key={""} value={""}>
            {""}
        </MenuItem>
        {props.teams.map((option) => (
          <MenuItem key={option.teamname} value={option.teamid}>
            {option.teamname}
          </MenuItem>
        ))}
      </TextField>
  </div>
  );
}