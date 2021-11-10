import React from "react";

export default function LatestShot(props) {
    const data = props.data;
    console.log(data);
    const player = data.personname;
    const made = data.make === 1 ? "Make" : "Miss";
    const contest = data.contesttype;
    const shottype = data.shottype;

    return (
        <div>
            <div>
                <h5>Player:</h5>
                <p>{player}</p>
            </div>
            <div>
                <h5>Shot Type:</h5>
                <p>{shottype}</p>
            </div>
            <div>
                <h5>Result:</h5>
                <p>{made}</p>
            </div>
            <div>
                <h5>Contest:</h5>
                <p>{contest}</p>
            </div>
        </div>
    )
    
}