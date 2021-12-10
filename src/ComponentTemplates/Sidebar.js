import React from "react";
import { Grid } from "@material-ui/core";
import { Card, CardContent } from "@material-ui/core";
import { Typography } from "@material-ui/core";

export default function Sidebar(props) {
  return (
    <Card variant="outlined">
      <CardContent>
      <Grid container spacing={1} className='sidebar'>
        <Grid item xs={12} className="sidebar-content">
            <Typography variant="h2" className="sidebar-header">{props.header}</Typography>
        </Grid>
        <Grid item xs={12}>
            {props.content}
        </Grid>
      </Grid>  
      </CardContent>
    </Card>
      )
};


