import React from "react";
import { TextField, MenuItem} from '@mui/material';
import { FormControl } from "@mui/material";

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
      <TextField select defaultValue={props.default} label={props.label} fullWidth onChange={(event) => {
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