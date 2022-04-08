
import * as React from 'react';
import { useEffect } from 'react';
import { Backdrop, Typography, Box } from '@mui/material';
import Loading from '../ComponentTemplates/Loading';
import { Theme } from '@mui/material/styles';


const tips = [
    ['"Everything negative - pressure, challenges - are all an opportunity for me to rise"', "Kobe Bryant"],
    ['"No matter the outcome, my shot is considered a make."', "Drew Dibble"],
    ['"I\'m like tax. You\'re going to pay one way or the other."', "Shaq"],
    ['"Success is not an accident, success is actually a choice."', "Stephen Curry"],
    ['"Be the best version of yourself in anything you do. You don\'t have to live anybody else\'s story."', "Stephen Curry"],
    ['"Hard work beats talent when talent doesn\'t work hard."', "Tim Notke/Kevin Durant"],
    ['"Why are frogs so good at basketball? Because they always make jump shots."', "Unknown"],
    ['"The only difference between a good shot and a bad shot is if it goes in or not."', "Charles Barkley"],
    ['"Winning is like deodorant – it comes up and a lot of things don’t stink."', "Doc Rivers"]
]

type Props = {
    theme: Theme
}

export default function LoadingPage(props: Props) {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const [loadingTip, setLoadingTip] = React.useState([""])
    useEffect(() => {
        setLoadingTip(tips[Math.floor(Math.random() * tips.length)])
    }, []);

    return (
        <Box>
            <Backdrop
                open={true}
                sx={{ backgroundImage: "url(https://dbukjj6eu5tsf.cloudfront.net/sidearm.sites/davidsonwildcats.com/images/2019/1/8/BrajkovicMason.png)" }}
            />
            <Backdrop
                sx={{ opacity: 100, zIndex: (theme) => theme.zIndex.drawer - 1, display: "flex", justifyContent: "center", alignItems: "center", backgroundImage: `linear-gradient(to bottom right, ${props.theme.palette.primary.main + "B3"}, #494949FF)` }}
                open={true}
                onClick={handleClose}
            >
                <Box sx={{ textAlign: "center" }}>
                    <Box sx={{ p: 1 }}>
                        <Loading />
                    </Box>
                    <Box sx={{ p: 1 }}>
                        <Typography paragraph sx={{ color: "white" }}>{loadingTip[0]}<br />{loadingTip[1]}</Typography>
                    </Box>

                </Box>
            </Backdrop>
        </Box>
    );
}