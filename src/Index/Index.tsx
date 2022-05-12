import React from "react";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Popup from "../Shotchart/Popup";
import TeamSelection from "./TeamSelect";
import Helpers from "../Utils/Helpers.js";
import { Backdrop, Grid, MenuItem, Typography } from "@mui/material";
import { useEffect } from "react";
import LoadingPage from "../PageTemplates/LoadingPage";
import { Box } from "@mui/system";
import { Theme } from '@mui/material/styles';
import hexcatwhite from "../logos/hexcatwhite.png";
import hexcatblack from "../logos/hexcatblack.png";



interface Props {
  theme: Theme
}

interface fullSession {
  sessionid: number,
  name: string,
  teamseasonid_1: string,
  teamseasonid_2: string
}

interface Session {
  sessionid: number,
  name: string,
}

export default function Index(props: Props) {
  const [teams, setTeams] = React.useState([]);
  const [sessions, setSessions] = React.useState<fullSession[] | null>(null);

  useEffect(() => {
    Helpers.getFetch("/davidson/sessions")
      .then((res) => {
        res.json().then((data) => {
          setSessions(data.reverse());
        });
      })
      .catch((err) => {
        console.log(err);
      });

    Helpers.getFetch("/teams?seasonyear=2021&leagueid=COLL&leaguelevel=NCAA1")
      .then((res) => {
        res.json().then((data) => {
          setTeams(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // Form data states
  const [currSession, setCurrSession] = React.useState<Session | null>(null);
  const [sessionName, setSessionName] = React.useState<string | null>(null);
  const [team1, setTeam1] = React.useState<number | null>(null);
  const [team2, setTeam2] = React.useState<number | null>(null);
  const [sessionType, setSessionType] = React.useState<string>("game");


  // Form validation states
  const [team2Req, setTeam2Req] = React.useState<boolean>(true);
  const [isNew, setIsNew] = React.useState<boolean>(false);
  const [errorShow, setErrorShow] = React.useState(false);

  // update team2 requirement based on the state of sessionType
  useEffect(() => {
    if (sessionType === "game") {
      setTeam2Req(true);
    } else {
      setTeam2Req(false)
    }
  }, [sessionType])

  // loading screen until teams and sessions are pulled
  if (teams.length === 0 && sessions === null) {
    return <LoadingPage theme={props.theme} />
  }

  const SubmitButton = <Button variant="contained" onClick={() => {
    if (isNew) {
      if (team1 === null || (team2 === null && team2Req) || sessionName === null) {
        setErrorShow(true);
      } else {
        Helpers.postFetch("/davidson/sessions", JSON.stringify([{
          name: sessionName,
          dateadded: new Date(),
          creator: "Michael",
          sessiontype: sessionType,
          teamseasonid_1: team1,
          teamseasonid_2: team2,
        }]))
          .then((res) => {
            if (res.status !== 201) {
              console.log("error with post fetch");
            } else {
              res.json().then((data) => {
                const sessionid = "sessionid=" + data[0].sessionid;
                const firstTeam = "team1=" + team1;
                const secondTeam = "team2=" + team2;
                window.location.href = "/shotchart?" + sessionid + "&" + firstTeam + "&" + secondTeam;
              });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }

    } else {
      if (currSession !== null) {
        const sessionid = "sessionid=" + currSession.sessionid;
        const firstTeam = "team1=" + team1;
        const secondTeam = "team2=" + team2;
        window.location.href = "/shotchart?" + sessionid + "&" + firstTeam + "&" + secondTeam;
      } else {
        setErrorShow(true);
      }
    }
  }}>Submit</Button>

  const resumeSession = (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8} lg={6}>
        <TextField fullWidth required select label="Select Previous Session" onChange={(event) => {
          const sessionInfo = JSON.parse(event.target.value);
          setTeam1(sessionInfo.teamseasonid_1);
          setTeam2(sessionInfo.teamseasonid_2);
          setCurrSession({ sessionid: sessionInfo.sessionid, name: sessionInfo.name });
          setSessionName(sessionInfo.name);
        }}>
          {sessions !== null ? sessions.map((session) => (
            <MenuItem key={session.sessionid} value={JSON.stringify(session)}>
              {session.name}
            </MenuItem>
          )) : null}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        {SubmitButton}
      </Grid>
    </Grid>
  );

  const newSession = (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={10}>
        <TextField id="session-name" label="Session Name" variant="standard" required fullWidth onChange={(e) => setSessionName(e.target.value)} />
      </Grid>
      <Grid item xs={12} sm={5} className="team-selection">
        <TeamSelection className="team-select" label="Home/Neutral" teams={teams} required={true} changeTeam={setTeam1} />
      </Grid>
      <Grid item xs={12} sm={5}>
        <TeamSelection className="team-select" label="Away/Neutral" teams={teams} required={team2Req} changeTeam={setTeam2} />
      </Grid>
      <Grid item xs={12} className="session-type">
        <RadioGroup defaultValue="game" aria-label="Session Type" name="session-select-group" onChange={(e) => setSessionType(e.target.value)}>
          <FormControlLabel sx={{ color: props.theme.palette.text.primary }} value="game" control={<Radio />} label="Game" />
          <FormControlLabel sx={{ color: props.theme.palette.text.primary }} value="scrimmage" control={<Radio />} label="Scrimmage" />
          <FormControlLabel sx={{ color: props.theme.palette.text.primary }} value="practice" control={<Radio />} label="Practice/Shoot Around" />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} className="session-submit-button">
        {SubmitButton}
      </Grid>
    </Grid>
  );

  return <Backdrop open={true} sx={{ p: 2, backgroundImage: `linear-gradient(to bottom right, ${props.theme.palette.primary.main + "FF"}, #494949FF)` }}>
    <Box sx={{ p: 2, mt: 2, boxShadow: 10, borderRadius: "20px", maxWidth: "500px", backgroundColor: props.theme.palette.secondary.main }}>
      <Grid sx={{ px: 2 }} container spacing={1}>
        <Grid item xs={12}>
          <Typography color="text.primary" variant="h2">SESSIONS</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography color={"text.secondary"} sx={{ fontSize: 16 }}>
            To start or continue a session, please fill in the required
            information below:
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormGroup>
            <FormControlLabel sx={{ color: props.theme.palette.text.primary }} control={<Checkbox checked={isNew} onChange={() => { setIsNew(!isNew); setTeam1(null); setTeam2(null); setCurrSession(null); }} />} label="New Session" />
          </FormGroup>
        </Grid>
        <Grid item xs={12}>
          {isNew ? newSession : resumeSession}
        </Grid>
      </Grid>
      <Backdrop open={errorShow} onClick={() => { setErrorShow(false) }} sx={{ zIndex: 2, position: "absolute" }}>
        <Box sx={{ backgroundColor: props.theme.palette.background.default, width: "60%", p: 5, borderRadius: "20px", boxShadow: 10, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", flexWrap: "wrap" }}>
          <Grid container spacing={1}>
          <Grid item xs={12}><img src={props.theme.palette.mode === 'dark' ? hexcatwhite : hexcatblack} style={{maxHeight: "200px", margin: 0}}/></Grid>
          <Grid item xs={12}> <Typography variant="h2">OOPS!</Typography></Grid>
            <Grid item xs={12}><Typography sx={{ fontSize: 20 }}>Please ensure you have filled out all required fields.<br/>Click anywhere to close this window.</Typography></Grid>
            
          </Grid>



        </Box>
      </Backdrop>
    </Box>

  </Backdrop>
}
