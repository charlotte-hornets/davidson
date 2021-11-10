import React from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

export default function TeamSelection(props) {
  return props.required ? (
    <div className="select">
      <h4>{props.name}</h4>
      <TextField required select defaultValue="" label="Select" fullWidth onChange={(event) => {
          props.changeTeam(event.target.value);
      }}>
        <MenuItem key={""} value={""}>
            {""}
        </MenuItem>
        {props.teams.map((option) => (
        <MenuItem key={option.teamname} value={option.teamid}>
          {option.teamname}
        </MenuItem>))}
      </TextField>
    </div>) : (
    <div className="select">
      <h4>{props.name}</h4>
      <TextField select defaultValue="" label="Select" fullWidth onChange={(event) => {
        props.changeTeam(event.target.value);
      }}>
        <MenuItem key={""} value={""}>
            {""}
        </MenuItem>
        {props.teams.map((option) => (
        <MenuItem key={option.teamname} value={option.teamid}>
          {option.teamname}
        </MenuItem>))}
      </TextField>
    </div>
  );
}