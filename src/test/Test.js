import { useState, useEffect } from "react";

export default function Test(props) {
    const [val, setVal] = useState('');

    // componentDidMount
    useEffect(() => {
        console.log('component did mount')
    }, [])

    // componentDidUpdate
    useEffect(() => {
        console.log('val did update')
    }, [val])

    // componentDidUnmount

    useEffect(() => {

    })

    return <div onClick={() => setVal(val + 1)}>
            Count {val}
        </div>
}