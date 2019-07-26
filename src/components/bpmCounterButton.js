import React, { useState, useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import MusicNote from '@material-ui/icons/MusicNote';
import Typography from '@material-ui/core/Typography';
import { findRegressionLine } from '../utils/linearRegression';

const useStyles = makeStyles(() =>
    createStyles({
        bpmText: {
            color: '#313131',
            fontWeight: 'bold',
        },
    })
);

const BPMCounterButton = () => {
    const classes = useStyles();

    const RESET_TIME = 5000;

    const [taps, setTaps] = useState([]);
    const [startTime, setStartTime] = useState(null);
    const [bpmCount, setBPMCount] = useState('');
    const [resetTimerId, setResetTimerId] = useState(null);

    useEffect(() => {}, []);

    const handleTap = ({ timeStamp }) => {
        if (!startTime) {
            setStartTime(Date.now());
        }

        const tapsCount = taps.length;
        const timeDiff = startTime ? Date.now() - startTime : 0;

        setTaps([...taps, [tapsCount, timeDiff]]);
        setBPMCount(calculateBPM(taps));
        startResetTimer();
    };

    const handleReset = () => {
        reset();
    };

    const startResetTimer = () => {
        clearTimeout(resetTimerId);
        const id = setTimeout(() => reset(), RESET_TIME);
        setResetTimerId(id);
    };

    const reset = () => {
        setBPMCount('');
        setTaps([]);
        setStartTime(null);
    };

    const calculateBPM = timestamps => {
        if (timestamps.length < 2) {
            return 0;
        }
        const sampleNumbers = timestamps.map(stamp => stamp[0]);
        const timeDiffs = timestamps.map(stamp => stamp[1]);
        const [a] = findRegressionLine(sampleNumbers, timeDiffs);
        return Math.round(60000 / a);
    };

    return (
        <Box>
            <Fab
                variant="extended"
                aria-label="Delete"
                size="large"
                onClick={handleTap}
            >
                <MusicNote />
                Tap me to the beat
            </Fab>
            {!!bpmCount && (
                <Box>
                    <Button
                        disableRipple={true}
                        size="small"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                    <Typography variant="h1" className={classes.bpmText}>
                        {bpmCount}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

export default BPMCounterButton;
