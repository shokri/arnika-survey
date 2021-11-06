import React from 'react'
import { RadioGroup, Radio, FormControlLabel, Typography, makeStyles, useTheme } from '@material-ui/core';
import SwipeableViews from 'react-swipeable-views';

const useStyles = makeStyles((theme) => ({
    question: {
        fontSize: 14,
        fontWeight: 'bold',
        marginRight: 10,
        marginBottom: 10
    },
    rtl: {
        textAlign: 'right',
        direction: 'rtl'
    },
    formLabel: {
        "& .MuiTypography-root": {
            fontSize: 13
        }
    }
}));

const Options = ({ question, activeStep, setActiveStep, answer, handleRadioChange }) => {
    const classes = useStyles();
    const theme = useTheme();

    const handleStepChange = (step) => {
        setActiveStep(step);
    };

    return (
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
        >
            {question.map((step, index) => (
                <div key={step.id} className={classes.rtl}>
                    {Math.abs(activeStep - index) <= 2 ? (
                        <Typography variant="body2" className={classes.question}>{step.question}</Typography>
                    ) : null}

                    <RadioGroup aria-label="survey" name={step.id.toString()} value={answer && answer[index]} onChange={handleRadioChange(index)}>
                        {
                            step.options.map((option, index) => (
                                <FormControlLabel key={index} className={classes.formLabel} value={option} control={<Radio size="small" />} label={option} />
                            ))
                        }
                    </RadioGroup>
                </div>
            ))}
        </SwipeableViews>
    )
}

export default Options;