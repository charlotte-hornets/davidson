import React from "react";
import { useEffect } from "react";
import Helpers from "../Utils/Helpers";
import { Box } from "@material-ui/system"
import TeamSelection from "../Index/TeamSelect";
import { TextField } from "@mui/material";
import { MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";
import {Grid} from "@material-ui/core"
import HexChart from "./HexChart"


let statesLoaded = 0;
let statesNeeded = 2;

export default function Analysis() {
    const [shots, setShots] = React.useState([])
    const [teams, setTeams] = React.useState("")
    const [sessions, setSessions] = React.useState([])
    
    const [team, setTeam] = React.useState(281);
    const updateTeam = (newTeam) => {
        setTeam(newTeam)
    }

    const [player, setPlayer] = React.useState(null)

    const [players, setPlayers] = React.useState([])
    const [teamseasonid, setTeamSeasonId] = React.useState(66427)
    
    useEffect(() => {
        Helpers.getFetch('/davidson/sessions')
        .then(res => {
        res.json().then(data => {
            statesLoaded++;
            setSessions(data.reverse());
        })
        }).catch(err => {
        console.log(err);
        });

        Helpers.getFetch('/teams?seasonyear=2021&leagueid=COLL&leaguelevel=NCAA1')
        .then(res => {
          res.json().then(data => {
            statesLoaded++;
            setTeams(data);
          })
        }).catch(err => {
          console.log(err);
        });

    }, [])

    // update team info when changed changed
    useEffect(() => {
        setPlayer(null)
        Helpers.getFetch('/team/roster?teamid=' + team + '&seasonyear=2021')
            .then(res => {
            res.json().then(data => {
                setPlayers(data)
                console.log(data)
                setTeamSeasonId(data[0].teamseasonid)
            })
            }).catch(err => {
                console.log(err);
            })
    }, [team]);

    // get shots when team info changed
    useEffect(() => {
        Helpers.getFetch('/davidson/shots?teamseasonid=' + teamseasonid)
        .then(res => {
            res.json().then(data => {
                setShots(data)
            })
            }).catch(err => {
                console.log(err);
            })
    }, [teamseasonid])

    // get player shots when player info changed
    useEffect(() => {
        if (player !== null) {
            Helpers.getFetch('/davidson/shots?teamseasonid=' + teamseasonid + "&playerid=" + player)
            .then(res => {
                res.json().then(data => {
                    setShots(data)
                })
                }).catch(err => {
                    console.log(err);
                })
        }
    }, [player])

    return <Box sx={{p: 2}}>
        <Grid container spacing={2} alignItems="center" justifyContent="center">
            {teams.length ? (<Grid item xs={12} sm={3} md={2}>
                <FormControl fullWidth>
                    <TextField select label="Team" value={team} defaultValue={281} onChange={(e) => {setTeam(e.target.value)}}>
                    {teams.map((team) => (
                        <MenuItem key={team.teamname} value={team.teamid}>
                        {team.teamname}
                        </MenuItem>
                    ))}
                    </TextField>
                </FormControl></Grid>) : null }
            {players.length ? (<Grid item xs={12} sm={4} md={3}>            
                <FormControl fullWidth>
                    <TextField select label="Player" value={player} onChange={(e) => {setPlayer(e.target.value)}}>
                    {players.map((player) => (
                        <MenuItem key={player.personname} value={player.personid}>
                        {player.personname}
                        </MenuItem>
                    ))}
                    </TextField>
                </FormControl>
            </Grid>) : null}
            <Grid item xs={0} sm={5} md={7}/>
            <Grid item md={7} sm={12}>
            <HexChart data={shots}/>
            </Grid>
        </Grid>
    </Box>
}