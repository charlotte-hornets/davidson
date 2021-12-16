import { useEffect } from "react";
import Loading from "../ComponentTemplates/Loading";
import React from "react";
import { Grid } from "@material-ui/core";

const tips = [
    ['"Everything negative - pressure, challenges - are all an opportunity for me to rise"', "Kobe Bryant"],
    ['"No matter the outcome, my shot is considered a make."', "Drew Dibble"],
    ['"I\'m like tax. You\'re going to pay one way or the other."', "Shaq"],
    ['"Success is not an accident, success is actually a choice."', "Stephen Curry"],
    ['"Be the best version of yourself in anything you do. You don\'t have to live anybody else\'s story."', "Stephen Curry"],
    ['"Hard work beats talent when talent doesn\'t work hard."', "Tim Notke/Kevin Durant"],
    ['"Why are frogs so good at basketball? Because they always make jump shots."', "Unknown"],
    ['"The only difference between a good shot and a bad shot is if it goes in or not."', "Charles Barkley"],
    ['"THE CONFERENCE OF CHAMPIONS"', "Bill Walton"],
    ['"Winning is like deodorant – it comes up and a lot of things don’t stink."', "Doc Rivers"]
]

export default function LoadingPage(props) {
    const [loadingTip, setLoadingTip] = React.useState("")
    useEffect(() => {
        setLoadingTip(tips[Math.floor(Math.random()*tips.length)])
    }, []);
    return <div className="loading-screen">
        <Grid container justifyContent="center" alignItems="center" spacing={2} style={{height: "100%"}}>
            <Grid item xs={12}>
                <Loading loaded={props.loaded} needed={props.needed}></Loading>
            </Grid>
            <Grid item xs={12}>
                <p className="loading-tip">{loadingTip[0]}<br/>{loadingTip[1]}</p>
            </Grid>
        </Grid>
    </div>
}