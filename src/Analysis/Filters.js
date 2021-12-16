import React from 'react'
import { Box } from '@material-ui/system'
import FormGroup from '@material-ui/core/FormGroup';
import FilterCheckbox from './FilterCheckbox';
import { Grid, Typography } from '@mui/material';


export default function Filters(props) {
    return <Box>
        <Grid container spacing={1} >
            <Grid item xs={6}>
                <Typography variant="p" style={{fontWeight: 700}}>SHOT TYPES</Typography>
                <FormGroup>
                    <FilterCheckbox value="Layup/Dunk" change={props.shotType} label="Layup/Dunk"/>
                    <FilterCheckbox value="Dribble Jumper" change={props.shotType} label="Dribble Jumper"/>
                    <FilterCheckbox value="Catch and Shoot" change={props.shotType} label="Catch and Shoot"/>
                    <FilterCheckbox value="Runner/Floater" change={props.shotType} label="Runner/Floater"/>
                    <FilterCheckbox value="Post Move" change={props.shotType} label="Post Move"/>
                </FormGroup>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="p" style={{fontWeight: 700}}>ROUND</Typography>
                <FormGroup>
                    <FilterCheckbox value={1} change={props.round} label="1"/>
                    <FilterCheckbox value={2} change={props.round} label="2"/>
                    <FilterCheckbox value={3} change={props.round} label="3"/>
                    <FilterCheckbox value={4}change={props.round} label="4"/>
                    <FilterCheckbox value={5} change={props.round} label="5"/>
                </FormGroup>
            </Grid>
            <Grid item xs={6}>
                <Typography variant="p" style={{fontWeight: 700}}>CONTEST</Typography>
                <FormGroup>
                    <FilterCheckbox value="Contested" change={props.contested} label="Contested"/>
                    <FilterCheckbox value="Uncontested" change={props.contested} label="Uncontested"/>
                </FormGroup>
            </Grid>
        </Grid>
    </Box>
}
