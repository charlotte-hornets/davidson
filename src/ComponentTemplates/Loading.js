import CircularProgress from '@mui/material/CircularProgress';

export default function Loading(props) {
    // calculating the value out of 100 for the progress bar to display 
    const progress = parseInt(100 * props.loaded / props.needed)
    return <CircularProgress className="loading-circle" color="error" variant="determinate" value={progress}/>
}