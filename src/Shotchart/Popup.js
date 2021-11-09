import React from "react";

export default function Popup(props) {

  return (
      <div className='popup'>
        <div className='popup_inner'>
          {props.showClose === false ? null : <span onClick={props.closePopup} className='close-button'>x</span>}
          <div>
            <h2>{props.header}</h2>
          </div>
          {props.content}
        </div>
      </div>
      )
};


