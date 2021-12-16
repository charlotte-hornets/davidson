import React from "react";
import { useEffect } from "react";
import Helpers from "../Utils/Helpers";
import { Box } from "@material-ui/system"
import { FormGroup, TextField } from "@mui/material";
import { MenuItem, FormControl } from "@material-ui/core";
import {Grid} from "@material-ui/core"
import {Typography, Button} from "@mui/material"
import {Card, CardContent} from "@material-ui/core"
import LoadingPage from "../PageTemplates/LoadingPage";
import Shotchart from "../Shotchart/Shotchart"
import Filters from "./Filters";
import GradientScale from "./GradientScale"
import FilterCheckbox from "./FilterCheckbox";
import CheckboxSelect from "./CheckboxSelect"
import StatCard from "../ComponentTemplates/StatCard";



let initialStatesLoaded = 0;
let initialStatesNeeded = 4;


export default function Analysis() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const defaultTeam = parseInt(urlParams.get('defaultTeam'))

    const [shots, setShots] = React.useState([])
    const [shotsCopy, setShotsCopy] = React.useState([])
    const getFGM = () => {
        let filtered = shotsCopy
        filtered = filtered.filter((item) => {return item.make === 1})
        return filtered.length
    }
    const [FGM, setFGM] = React.useState(getFGM)

    //filters
    const [sessions, setSessions] = React.useState([]);
    const [sessionsList, setSessionsList] = React.useState([]);
    const [selectedSessions, setSelectedSessions] = React.useState([]);
    const handleSelectedSessionsChange = (event) => {
        setSelectedSessions(event.target.value);
    }


    const [sessionTypes, setSessionTypes] = React.useState(["game", "practice","scrimmage"]);
    const handleSessionTypeChange = (event) => {
        sessionTypes.includes(event.target.value) ? setSessionTypes(sessionTypes.filter((e) => {return e !== event.target.value})) : setSessionTypes([...sessionTypes, event.target.value]);
    }


    const [shotType, setShotType] = React.useState(["Layup/Dunk", "Dribble Jumper", "Catch and Shoot", "Runner/Floater", "Post Move"])
    const handleShotTypeChange = (event) => {
        shotType.includes(event.target.value) ? setShotType(shotType.filter((e) => {return e !== event.target.value})) : setShotType([...shotType, event.target.value]);
    }

    const [rounds, setRounds] = React.useState(["1", "2", "3", "4", "5"])
    const handleRoundChange = (event) => {
        rounds.includes(event.target.value) ? setRounds(rounds.filter((e) => {return e !== event.target.value})) : setRounds([...rounds, event.target.value]);
    }

    const [contest, setContest] = React.useState(["Contested", "Uncontested"])
    const handleContestChange = (event) => {
        contest.includes(event.target.value) ? setContest(contest.filter((e) => {return e !== event.target.value})) : setContest([...contest, event.target.value]);
    }

    const filterShots = () => {
        let filtered = shots
        filtered = filtered.filter((shot) => {
            return shotType.includes(shot.shottype)
        })
        filtered = filtered.filter((shot) => {
            return rounds.includes(String(shot.round))
        })
        filtered = filtered.filter((shot) => {
            return contest.includes(String(shot.contesttype))
        })
        filtered = filtered.filter((shot) => {
            return contest.includes(String(shot.contesttype))
        })
        filtered = filtered.filter((shot) => {
            return selectedSessions.includes(shot.sessionid)
        })
        return filtered
    }
    
    useEffect(() => {
        setShotsCopy(filterShots)
    }, [shots])

    useEffect(() => {
        setShotsCopy(filterShots)
    }, [shotType])

    useEffect(() => {
        setShotsCopy(filterShots)
    }, [rounds])

    useEffect(() => {
        setShotsCopy(filterShots)
    }, [contest])

    useEffect(() => {
        setFGM(getFGM)
    }, [shotsCopy])

    const [teams, setTeams] = React.useState([])

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

    const filterSessions = () => {
        let filtered = sessions;
        filtered = filtered.filter((session) => {
            return sessionTypes.includes(session.sessiontype)});
        filtered = filtered.filter((session) => {
            return (session.teamseasonid_1 === team || session.teamseasonid_2 === team)
        })
        return filtered.map((session) => session.sessionid)
    }

    useEffect(() => {
        setSessionsList(filterSessions);
        setSelectedSessions(filterSessions);
    }, [sessions]);

    useEffect(() => {
        setShotsCopy(filterShots);
    }, [sessionsList])

    useEffect(() => {
        setSessionsList(filterSessions);
        setSelectedSessions(filterSessions)
    }, [sessionTypes]);

    useEffect(() => {
        setSessionsList(filterSessions);
        setSelectedSessions(filterSessions); 
    }, [team])

    useEffect(() => {
        setShotsCopy(filterShots);
    }, [selectedSessions])
    
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
        setShotsCopy(filterShots)
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
        <Grid container spacing={4} alignItems="center" justifyContent="center">
            {teams.length ? <Grid item xs={12} sm={3} md={2}>
                <FormControl fullWidth>
                    <TextField select label="Team" value={team} defaultValue={defaultTeam} onChange={(e) => {setTeam(e.target.value)}}>
                        {teams.map((team) => (<MenuItem key={team.teamname} value={team.teamid}>{team.teamname}</MenuItem>))}
                    </TextField>
                </FormControl>
                </Grid> : null }
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
            <Grid item sm={5} md={7} />

            <Grid item xs={12}>
            <Grid container alignItems="flex-start" justifyContent="space-evenly" spacing={4}>
                <Grid item md={7} sm={12}>
                    <Shotchart data={shots.length ? shotsCopy : []} variant="hex"/>
                    <GradientScale />
                </Grid>
              <Grid item md={5} sm={12}>
                <Card variant="outlined">
                  <CardContent>
                    <Box sx={{p: 2}}>
                        <Grid container spacing={2} justifyContent="center" alignItems="center">
                            <Grid item xs={12}>
                                <Typography variant="h2">OPTIONS</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="p" style={{fontWeight: 700}}>TYPE:</Typography>
                            </Grid>
                            <Grid item xs={4}>
                                <FilterCheckbox value="game" label="Game" change={handleSessionTypeChange}/>
                            </Grid>
                            <Grid item xs={4}>
                                <FilterCheckbox value="scrimmage" label="Scrimmage" change={handleSessionTypeChange}/>
                            </Grid>
                            <Grid item xs={4}>
                                <FilterCheckbox value="practice" label="Practice" change={handleSessionTypeChange}/>
                            </Grid>
                            <Grid item xs={8}>
                                <CheckboxSelect sessions={sessions} validSessions={sessionsList} selected={selectedSessions} change={handleSelectedSessionsChange}/>
                            </Grid>
                            <Grid item xs={4}>
                                <Button variant="contained" onClick={() => {
                                    JSON.stringify(selectedSessions) == JSON.stringify(sessionsList) ? setSelectedSessions([]) : setSelectedSessions(sessionsList);
                                }}>Toggle Select</Button>
                            </Grid>
                            <Grid item xs={12}>
                                <Filters shotType={handleShotTypeChange} round={handleRoundChange} contested={handleContestChange}/>
                            </Grid>
                        </Grid>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            </Grid>
            <Grid item xs={4}>
                <StatCard name="FGA" content={shotsCopy.length}/>
            </Grid>
            <Grid item xs={4}>
                <StatCard name="FGM" content={FGM}/>
            </Grid>
            <Grid item xs={4}>
                <StatCard name="FG%" content={(100 * FGM / shotsCopy.length).toFixed(0) + "%"}/>
            </Grid>

        </Grid>
    </Box> : <LoadingPage loaded={initialStatesLoaded} needed={initialStatesNeeded}/>;
}