import { useEffect } from "react";
import Loading from "../ComponentTemplates/Loading";
import React from "react";

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

    console.log(props.loaded, props.needed)
    return <div >
        <div className="loading-screen">
            <Loading loaded={props.loaded} needed={props.needed}></Loading>
            <p className="loading-tip" >{loadingTip[0]}<br/>{loadingTip[1]}</p>
        </div>
    </div>
}