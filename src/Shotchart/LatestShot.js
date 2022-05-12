import React from "react";
import { Typography } from "@material-ui/core";
import { Grid } from "@material-ui/core";

export default function LatestShot(props) {
    const data = props.data;
    const player = data.personname;
    const made = data.make === 1 ? "Make" : "Miss";
    const contest = data.contesttype;
    const shottype = data.shottype;

    return (
        <Grid container spacing={2}>
            <Grid item sm={6} xs={12}>
                <Typography color="text.primary" variant="p" style={{fontWeight: 700}}>PLAYER<br/></Typography>
                <Typography color="text.primary" variant="p">{player}</Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography color="text.primary" variant="p" style={{fontWeight: 700}}>SHOT TYPE<br/></Typography>
                <Typography color="text.primary" variant="p">{shottype}</Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography color="text.primary" variant="p" style={{fontWeight: 700}}>RESULT<br/></Typography>
                <Typography color="text.primary" variant="p">{made}</Typography>
            </Grid>
            <Grid item sm={6} xs={12}>
                <Typography color="text.primary" variant="p" style={{fontWeight: 700}}>CONTEST<br/></Typography>
                <Typography color="text.primary" variant="p">{contest}</Typography>
            </Grid>
        </Grid>
    )
    
}