import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

const useStyles = makeStyles((theme) => ({
    root: {

        width: '100%',

        marginTop: "55px",

    },
}));

export default function Loader() {
    const [ReturnError, setReturnError] = useState(false)
    const returnSetter = () => setReturnError(true)

    useEffect(() => {
        setTimeout(returnSetter, 7000)
        return () => {
            clearTimeout(returnSetter)
        }
    }, [])
    const classes = useStyles();

    return (
        <div className={classes.root}>
            {ReturnError ? <div className="NoPage"><h3>No pages found, Try again.</h3></div> : <LinearProgress />}
        </div>
    );
}
