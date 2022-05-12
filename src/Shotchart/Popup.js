import React from "react";
import { Typography } from "@material-ui/core";

export default function Popup(props) {
  return (
      <div className='popup'>
        <div className='popup_inner'>
          {props.showClose === false ? null : <span onClick={props.closePopup} className='close-button'>x</span>}
          <div>
            <Typography variant="h2">{props.header}</Typography>
          </div>
          {props.content}
        </div>
      </div>
      )
};


