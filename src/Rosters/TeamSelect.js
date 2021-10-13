import teams from "./NCAATeams.js";
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

let teamsArray = teams.split('\n');
let teamDict = teamsArray.map(team => {
    return({value: team, label: team});
})

export default function TeamSelection(props) {
    return (
    <div className="team-select">
        <h4>{props.name}</h4>
        <TextField
          select
          label="Select"
          fullWidth
        >
          {teamDict.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
    </div>);
}