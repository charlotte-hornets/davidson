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
import LoadingPage from "../PageTemplates/LoadingPage.tsx";
import { Box } from "@mui/system";

let statesLoaded = 0;
let statesNeeded = 2;


export default function Index(props) {
  const [teams, setTeams] = React.useState("");
  const [sessions, setSessions] = React.useState([]);

  useEffect(() => {
    Helpers.getFetch("/davidson/sessions")
      .then((res) => {
        res.json().then((data) => {
          statesLoaded++;
          setSessions(data.reverse());
        });
      })
      .catch((err) => {
        console.log(err);
      });

    Helpers.getFetch("/teams?seasonyear=2021&leagueid=COLL&leaguelevel=NCAA1")
      .then((res) => {
        res.json().then((data) => {
          statesLoaded++;
          setTeams(data);
          console.log(data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const [secondRequired, setSecondRequired] = React.useState(true);
  const [sessionType, setSessionType] = React.useState("game");
  const handleSessionTypeChange = (event) => {
    setSessionType(event.target.value);
    checked && event.target.value === "game"
      ? setSecondRequired(true)
      : setSecondRequired(false);
  };

  const [team1, setTeam1] = React.useState();
  const updateTeam1 = (newTeam) => {
    setTeam1(parseInt(newTeam));
  };

  const [team2, setTeam2] = React.useState();
  const updateTeam2 = (newTeam) => {
    setTeam2(parseInt(newTeam));
  };

  const [alert, setAlert] = React.useState({ show: false });

  const [sessionName, setSessionName] = React.useState("");
  const handleNameChange = (event) => {
    setSessionName(event.target.value);
  };

  const [currentSession, setCurrentSession] = React.useState({});
  const handleSessionChange = (event) => {
    setCurrentSession(event.target.value);
    setSessionName(event.target.value.name);
  };

  const [checked, setChecked] = React.useState(false);
  const handleCheckedChange = () => {
    setChecked(!checked);
    setCurrentSession({});
  };

  const SubmitButton = () => {
    if (checked) {
      return (
        <Button
          variant="contained"
          onClick={() => {
            Helpers.postFetch(
              "/davidson/sessions",
              JSON.stringify([
                {
                  name: sessionName,
                  dateadded: new Date(),
                  creator: "Michael",
                  sessiontype: sessionType,
                  teamseasonid_1: team1,
                  teamseasonid_2: team2,
                },
              ])
            )
              .then((res) => {
                if (res.status !== 201) {
                  console.log("error with post fetch");
                } else {
                  res.json().then((data) => {
                    const sessionid = "sessionid=" + data[0].sessionid;
                    const firstTeam = "team1=" + team1;
                    const secondTeam = "team2=" + team2;
                    window.location =
                      "/shotchart?" +
                      sessionid +
                      "&" +
                      firstTeam +
                      "&" +
                      secondTeam;
                  });
                  console.log("posted");
                }
              })
              .catch((err) => {
                console.log(err);
              });
          }}
        >
          Submit
        </Button>
      );
    } else {
      return (
        <Button
          variant="contained"
          onClick={() => {
            console.log(currentSession.sessionid);
            if (currentSession.sessionid === undefined) {
              setAlert({ show: true });
            } else {
              // run  the form validation logic here & display an error message if anything is missing
              // console.log([selected, checked, props.x_coord, props.y_coord]);
              //window.location = '/shotchart?sessionid=' + sessionId;
              const sessionid = "sessionid=" + currentSession.sessionid;
              const firstTeam = "team1=" + currentSession.teamseasonid_1;
              const secondTeam = "team2=" + currentSession.teamseasonid_2;
              window.location =
                "/shotchart?" + sessionid + "&" + firstTeam + "&" + secondTeam;
            }
          }}
        >
          Submit
        </Button>
      );
    }
  };

  const resumeSession = (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8} lg={6}>
        <TextField
          fullWidth
          required
          select
          defaultValue=""
          label="Select"
          onChange={handleSessionChange}
        >
          {sessions.map((option) => (
            <MenuItem key={option.sessionid} value={option}>
              {option.name}
            </MenuItem>
          ))}
        </TextField>
      </Grid>
      <Grid item xs={12}>
        {SubmitButton()}
      </Grid>
    </Grid>
  );

  const newSession = (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          id="session-name"
          label="Session Name"
          variant="standard"
          required
          onChange={handleNameChange}
        />
      </Grid>
      <Grid item xs={8} sm={3} className="team-selection">
        <TeamSelection
          className="team-select"
          label="Home/Neutral"
          teams={teams}
          required={true}
          changeTeam={updateTeam1}
        ></TeamSelection>
      </Grid>
      <Grid item xs={8} sm={3}>
        <TeamSelection
          className="team-select"
          label="Away/Neutral"
          teams={teams}
          required={secondRequired}
          changeTeam={updateTeam2}
        ></TeamSelection>
      </Grid>
      <Grid item xs={12} className="session-type">
        <RadioGroup
          defaultValue="game"
          aria-label="Session Type"
          name="session-select-group"
          onChange={handleSessionTypeChange}
        >
          <FormControlLabel
            sx={{ color: props.theme.palette.text.primary }}
            value="game"
            control={<Radio />}
            label="Game"
          />
          <FormControlLabel
            sx={{ color: props.theme.palette.text.primary }}
            value="scrimmage"
            control={<Radio />}
            label="Scrimmage"
          />
          <FormControlLabel
            sx={{ color: props.theme.palette.text.primary }}
            value="practice"
            control={<Radio />}
            label="Practice/Shoot Around"
          />
        </RadioGroup>
      </Grid>
      <Grid item xs={12} className="session-submit-button">
        {SubmitButton()}
      </Grid>
    </Grid>
  );

  return statesLoaded === statesNeeded ? (
    <Backdrop
      open={true}
      sx={{ p: 2, backgroundImage: `linear-gradient(to bottom right, ${props.theme.palette.primary.main + "FF"}, #494949FF)` }}
    >
      <Box
        sx={{
          p: 2,
          mt: 2,
          boxShadow: 10,
          borderRadius: "20px",
          maxWidth: "500px",
          backgroundColor: props.theme.palette.secondary.main
        }}

      >
        <Grid sx={{ px: 2 }} container spacing={1}>
          <Grid item xs={12}>
            <Typography color="text.primary" variant="h2">SESSIONS</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="p" color={"text.secondary"} sx={{ fontSize: 16 }}>
              To start or continue a session, please fill in the required
              information below:
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <FormGroup>
              <FormControlLabel
                sx={{ color: props.theme.palette.text.primary }}
                control={
                  <Checkbox
                    checked={checked}
                    onChange={() => {
                      handleCheckedChange();
                      setSessionName("");
                    }}
                  />
                }
                label="New Session"
              />
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            {checked ? newSession : resumeSession}
          </Grid>
        </Grid>
        {alert.show ? (
          <Popup
            header={"Error"}
            closePopup={() => setAlert({ show: false })}
            content={
              sessionName === "" ? (
                <p>Please provide a session name.</p>
              ) : team1 === "" ? (
                <p>Please provide a team in the first box</p>
              ) : (
                <p>Please provide a team in the second box</p>
              )
            }
            showClose={true}
          />
        ) : null}
      </Box>
    </Backdrop>
  ) : (
    <LoadingPage needed={statesNeeded} loaded={statesLoaded} theme={props.theme} />
  );
}
