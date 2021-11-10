import React from "react";

export default function Sidebar(props) {
  return (
      <div className='sidebar'>
        <div className="sidebar-content">
            <h2 className="sidebar-header">{props.header}</h2>
        </div>
            {props.content}
        </div>

      )
};


