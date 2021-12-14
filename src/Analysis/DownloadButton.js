import { Button } from "@material-ui/core";
import React from "react";
import toImg from 'react-svg-to-image';

export default function DownloadSVG(props) {
    return <Button color="primary" variant="contained" fullWidth onClick={() => {
        toImg('#court-analysis-diagram', 'hexbin-analysis', {
            scale: 1,
            quality: 1,
            download: true
          })
    }}>DOWNLOAD</Button>
}