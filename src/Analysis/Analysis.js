import React from "react";
import { useEffect } from "react";
import Helpers from "../Utils/Helpers";
import { Box } from "@material-ui/system"
import TeamSelection from "../Index/TeamSelect";
import { TextField } from "@mui/material";
import { MenuItem, FormControl, InputLabel, Select } from "@material-ui/core";
import {Grid} from "@material-ui/core"
import HexChart from "./HexChart";
import {Typography} from "@mui/material"
import {Card, CardContent} from "@material-ui/core"
import LoadingPage from "../PageTemplates/LoadingPage";
import DownloadSVG from "./DownloadButton";



let initialStatesLoaded = 0;
let initialStatesNeeded = 4;


export default function Analysis() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const defaultTeam = parseInt(urlParams.get('defaultTeam'))

    const [shots, setShots] = React.useState([])
    const [teams, setTeams] = React.useState([])
    const [sessions, setSessions] = React.useState([])
    
    const [team, setTeam] = React.useState(defaultTeam);
    const updateTeam = (newTeam) => {
        setTeam(newTeam)
    }

    const [player, setPlayer] = React.useState(undefined)

    const [players, setPlayers] = React.useState([])
    const [teamseasonid, setTeamSeasonId] = React.useState(() => {
        var seasonid = 0
        Helpers.getFetch('/team/roster?teamid=' + team + '&seasonyear=2021')
            .then(res => {
            res.json().then(data => {
                seasonid = data[0].teamseasonid;
                
            })
            }).catch(err => {
                console.log(err);
        })
        return seasonid
    })
    
    useEffect(() => {
        initialStatesLoaded = 0;
        Helpers.getFetch('/davidson/sessions')
        .then(res => {
        res.json().then(data => {
            setSessions(data.reverse());
            initialStatesLoaded++;
        })
        }).catch(err => {
        console.log(err);
        });

        Helpers.getFetch('/teams?seasonyear=2021&leagueid=COLL&leaguelevel=NCAA1')
        .then(res => {
          res.json().then(data => {
            setTeams(data);
            initialStatesLoaded++;
          })
        }).catch(err => {
          console.log(err);
        });
    }, [])

    // update team info when team changed
    useEffect(() => {
        Helpers.getFetch('/team/roster?teamid=' + team + '&seasonyear=2021')
            .then(res => {
            res.json().then(data => {
                setPlayers(data)
                console.log(data)
                setTeamSeasonId(data[0].teamseasonid)
                initialStatesLoaded++;
                setPlayer(undefined)
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
                initialStatesLoaded++;
            })
            }).catch(err => {
                console.log(err);
            })
    }, [teamseasonid])

    // get player shots when player info changed
    useEffect(() => {
        if ( player !== undefined) {
            console.log(player)
            Helpers.getFetch('/davidson/shots?teamseasonid=' + teamseasonid + "&playerid=" + player)
            .then(res => {
                res.json().then(data => {
                    setShots(data)
                })
                }).catch(err => {
                    console.log(err);
                })
        } else {
            Helpers.getFetch('/davidson/shots?teamseasonid=' + teamseasonid)
            .then(res => {
                res.json().then(data => {
                    setShots(data)
                })
                }).catch(err => {
                    console.log(err);
                })
        }
    }, [player])

    return (initialStatesLoaded >= initialStatesNeeded) ? <Box sx={{p: 2}}>
        <Grid container spacing={1} alignItems="center" justifyContent="center">
            {teams.length ? (<Grid item xs={12} sm={3} md={2}>
                <FormControl fullWidth>
                    <TextField select label="Team" value={team} defaultValue={defaultTeam} onChange={(e) => {setTeam(e.target.value)}}>
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
                        <MenuItem key={"None"} value={undefined}>
                            {"None"}
                        </MenuItem>
                        {players.map((player) => (
                            <MenuItem key={player.personname} value={player.personid}>
                            {player.personname}
                            </MenuItem>
                        ))}
                    </TextField>
                </FormControl>
            </Grid>) : null}
            <Grid item xs={0} sm={5} md={7} />

            <Grid item xs={12}>
            <Grid container alignItems="flex-start" justifyContent="space-evenly" spacing={4}>
                <Grid item md={7} sm={12}>
                    <HexChart data={shots.length ? shots : []}/>
                </Grid>
              <Grid item md={5} sm={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Grid container spacing={2} justifyContent="space-around" alignItems="center">
                      <Grid item xs={12}><Typography variant="h2">OPTIONS</Typography></Grid>
                      <Grid item xs={4} style={{textAlign: "center"}}>
                          <DownloadSVG/>
                      </Grid>
                      <Grid item xs={8} />
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            </Grid>
        </Grid>
    </Box> : <LoadingPage loaded={initialStatesLoaded} needed={initialStatesNeeded}/>;
}