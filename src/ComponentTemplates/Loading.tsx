import CircularProgress from '@mui/material/CircularProgress';

type Props = {
    loaded: number,
    needed: number
}

const Loading = ({loaded, needed} : Props) => {
    // calculating the value out of 100 for the progress bar to display 
    const progress = 100 * loaded / needed;
    console.log(progress)
    return <CircularProgress sx={{color: "white"}} variant="determinate" value={progress}/>
}

export default Loading;