import React from "react";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { Box } from "@material-ui/system";
import { FormControl } from "@material-ui/core";

export default function TeamSelection(props) {
  return props.required ? (
      <FormControl fullWidth>
        <TextField select required defaultValue={props.default} label={props.label} fullWidth onChange={(event) => {props.changeTeam(event.target.value)}}>
          {props.teams.map((option) => (
            <MenuItem key={option.teamname} value={option.teamid}>
              {option.teamname}
            </MenuItem>
          ))}
        </TextField>
      </FormControl>
    ) : (
      <FormControl fullWidth>
      <TextField select defaultValue={props.default} label="Select" fullWidth onChange={(event) => {
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
      </FormControl>
  );
}