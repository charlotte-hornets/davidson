import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import ListItemText from "@mui/material/ListItemText";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";


const CheckboxSelect = (props) => {
  const sessions = props.sessions;
  const selected = props.selected;
  const valid = props.validSessions;
  return valid.length ? (
    <div>
      <FormControl fullWidth>
        <InputLabel id="sessions-select-label">Sessions</InputLabel>
        <Select
          labelId="sessions-select"
          id="sessions-select"
          multiple
          value={selected}
          renderValue={(selected) => selected.length + " selected"}
          input={<OutlinedInput label="Sessions" />}
          onChange={props.change}
        >
          {valid.map((session) => {
            session = sessions.find((element) => {
              return element.sessionid === session;
            });
            return (
              <MenuItem key={session.name} value={session.sessionid}>
                <Checkbox checked={selected.includes(session.sessionid)} />
                <ListItemText primary={session.name} />
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </div>
  ) : null;
}

export default CheckboxSelect;
