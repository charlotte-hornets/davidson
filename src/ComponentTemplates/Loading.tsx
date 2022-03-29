import CircularProgress from '@mui/material/CircularProgress';

type Props = {
    loaded: number,
    needed: number
}

const Loading = ({loaded, needed} : Props) => {
    // calculating the value out of 100 for the progress bar to display 
    const progress = 100 * loaded / needed;
    return <CircularProgress className="loading-circle" color="error" variant="determinate" value={progress}/>
}

export default Loading;