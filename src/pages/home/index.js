import React, { useState } from 'react'
import { Card, Typography, Button, makeStyles, withStyles, useTheme } from '@material-ui/core';
import { amber } from '@material-ui/core/colors';
import { useDispatch, useSelector } from 'react-redux';
import './style.scss';

import MobileStepper from '@material-ui/core/MobileStepper';
import { KeyboardArrowLeft, KeyboardArrowRight, Refresh, Send } from '@material-ui/icons';
import SwipeableViews from 'react-swipeable-views';
import mobileImg from '../../assets/images/mobile.png'
import { setAnswer } from '../../redux/actions/app';
import QuestionOptions from '../../components/questionOptions';

const useStyles = makeStyles((theme) => ({
    root: {
        background: `url(${mobileImg}) no-repeat center center`,
        backgroundSize: 'contain',
        overflow: 'hidden',
        height: 'clamp(401px, 40vw, 500px)',
        width: `clamp(413px, 40vw, 485px)`
    },
    card: {
        background: 'none',
        height: `100%`,
        boxShadow: 'none',
        padding: 'clamp(24px, 2vw, 27px) clamp(122px, 13vw, 144px) 50px clamp(115px, 12vw, 134px)'
    },
    header: {
        display: 'flex',
        alignItems: 'center',
        height: 'clamp(50px, 6vw, 72px)',
        padding: 0,
        background: 'none',
    },
    headerButton: {
        minWidth: 20
    },
    wrapper: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden',
        paddingTop: 64,
        [theme.breakpoints.up('lg')]: {
            paddingLeft: 200,
            paddingRight: 10
        }
    },
    contentContainer: {
        display: 'flex',
        flex: '1 1 auto',
        overflow: 'hidden'
    },
    content: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto'
    },
    thank: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        height: '90%',
        "& .MuiTypography-root": {
            fontSize: 'clamp(18px, 3vw, 22px)',
            textAlign: 'center',
            direction: 'rtl',
            fontWeight: 'bold',
            marginBottom: 'clamp(25px, 3vw, 50px)',
            marginRight: 'clamp(12px, 3vw, 29px)',
            marginLeft: 'clamp(12px, 3vw, 29px)'
        }
    },
    form: {
        textAlign: 'right',
        direction: 'rtl'
    }
}));

const ColorButton = withStyles(() => ({
    root: {
        backgroundColor: amber[400],
        '&:hover': {
            backgroundColor: amber[300],
        },
    },
}))(Button);

const question = [
    {
        id: 1,
        question: 'متولد چه فصل از سال هستید؟',
        options: ['پاییز', 'تابستان', 'بهار', 'زمستان']
    },
    {
        id: 2,
        question: 'چه رنگی دوست دارید',
        options: ['گزینه 1', 'گزینه 2']
    },
    {
        id: 3,
        question: 'چه مدل غذایی',
        options: ['فست فود', 'سنتی']
    },
    {
        id: 4,
        question: 'تعداد دوستان صمیمی؟',
        options: ['یکی', 'بیشتر از 3 تا']
    },
    {
        id: 5,
        question: 'از شغلت راضی هستی؟',
        options: ['آره', 'نه', 'بد نیست']
    },
    {
        id: 6,
        question: 'کدوم میوه بیشتر دوست داری؟',
        options: ['سیب', 'موز', 'پرتقال']
    },
];

const HomeContainer = () => {
    const dispatch = useDispatch();
    const { answer = [] } = useSelector(({ app }) => app)
    const [activeStep, setActiveStep] = useState(0);
    const maxSteps = question.length;
    const classes = useStyles();
    const theme = useTheme();


    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleRadioChange = index => e => {
        if (answer || answer?.length) {
            answer[index] = e.target.value;
            dispatch(setAnswer(answer));
        }
        // Handle stepper, except in the last step
        if (activeStep !== maxSteps - 1)
            handleNext()
    };

    // Handle the restart button
    const onStartHandle = () => { 
        dispatch(setAnswer());
        setActiveStep(0);
    };

    return (
        <div className={classes.root}>
            <Card className={classes.card}>
                {activeStep !== maxSteps &&
                    <MobileStepper
                        variant="text"
                        className={classes.header}
                        steps={maxSteps}
                        position="static"
                        activeStep={activeStep}
                        nextButton={
                            <Button size="small" className={classes.headerButton} onClick={handleNext}
                                disabled={activeStep === (question.length - 1) && !answer.length}>
                                {activeStep === (question.length - 1) ? <Send /> : <KeyboardArrowRight />}
                            </Button>
                        }
                        backButton={
                            <Button size="small" className={classes.headerButton} onClick={handleBack} disabled={activeStep === 0}>
                                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                            </Button>
                        }
                    />
                }
                {activeStep !== maxSteps
                    ? <QuestionOptions {...{ question, activeStep, setActiveStep, maxSteps, answer, handleRadioChange }} /> // Reusable component questions and options
                    : <div className={classes.thank}>
                        <Typography>از همراهی شما متشکریم!</Typography>
                        <ColorButton variant="contained" size="small" onClick={onStartHandle} endIcon={<Refresh />}>از نو شروع کنید</ColorButton>
                    </div>
                }
            </Card>
        </div>
    )
}

export default HomeContainer;