import React from "react";
import { Grid } from "@material-ui/core";
import { Typography } from "@material-ui/core";

type Props = {
  header: string,
  content: HTMLElement,
}

const Sidebar = ({header, content} : Props) => {
  return (
      <Grid container spacing={1} className='sidebar' sx={{height: 200}}>
        <Grid item xs={12} className="sidebar-content">
            <Typography variant="h2" className="sidebar-header">{header}</Typography>
        </Grid>
        <Grid item xs={12}>
            {content}
        </Grid>
      </Grid>  
      )
};

export default Sidebar;
