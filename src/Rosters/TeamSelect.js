import teams from "./NCAATeams.js" 

export default function TeamSelection(props) {
    const teamsArray = teams.split('\n');
    return (
    <div class="team-select">
        <h5>{props.name}</h5>
        <input list="brow"/>
        <datalist id="brow">
            <option value="Select Team">Select Team</option>
            {teamsArray.map((team) => <option value={team}>{team}</option>)}
        </datalist>
    </div>);
}