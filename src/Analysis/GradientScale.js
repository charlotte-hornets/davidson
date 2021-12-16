import React from 'react'
import { Box } from '@material-ui/system'
import { Grid, Typography } from '@mui/material'



export default function GradientScale() {
    return <Grid container spacing={0} alignItems="center" justifyContent={"center"}>
            <Grid item xs={12}>
                <Box sx={{
                    backgroundImage: "linear-gradient(to right, #023047, #fb8500)",
                    height: "2.5vh",
                    opacity: 0.85
                }}></Box>
            </Grid>
            <Grid item xs={1}>
                <Typography variant="p">0%</Typography>
            </Grid>
            <Grid item xs={10} style={{textAlign: "center"}}>
                <Typography variant="p" style={{fontWeight: 700}}>FG%</Typography>
            </Grid>
            <Grid item xs={1} style={{textAlign: "right"}}>
                <Typography variant="p">100%</Typography>
            </Grid>

        </Grid>
}


