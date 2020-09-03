import React, { useState } from 'react'
import { QuestionCard } from './QuestionCard'
import { fetchQuestions } from '../Services/API'
import { PageProps, QuestionState, AnswerObject } from '../Types/QuizTypes'
import { makeStyles, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2% 7%',
        [theme.breakpoints.down("xs")]: {
            padding: "4% 3% 2% 2%",
        },
    },
    QuizInfo: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    QuizDetail: {
        [theme.breakpoints.down("xs")]: {
            fontSize: '17px'
        },
    },
    Result: {
        fontWeight: 'bold',
        textDecoration: 'underline',
    },
    Score: {
        textAlign: 'center',
        backgroundColor: '#999c9e',
        padding: '5px 20px',
        marginBottom: '3%',
        [theme.breakpoints.down("xs")]: {
            padding: '0px'
        },
    },
    Heading: {
        textAlign: 'center',
        padding: '1%',
        fontWeight: 'bold',
        textDecoration: 'underline',
        [theme.breakpoints.down("xs")]: {
            fontSize: "45px",
        },
    },
    Body: {
        textAlign: 'center',
        padding: '1%',
        [theme.breakpoints.down("xs")]: {
            fontSize: "25px",
            padding: '8% 1% 5% 1%'
        },
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 auto',
        padding: '1% 20%',
        fontSize: '21px',
        [theme.breakpoints.down("xs")]: {
            fontSize: "17px",
        },
    },
    StartButton: {
        padding: '1.3% 14%',
        width: '60%',
        fontSize: '21px',
        margin: '1%',
        [theme.breakpoints.down("xs")]: {
            fontSize: "17px",
            width: '80%',
        },
    },
    ResetButton: {
        padding: '1.3% 14%',
        width: '60%',
        fontSize: '21px',
        margin: '1%',
        [theme.breakpoints.down("xs")]: {
            fontSize: "17px",
            width: '80%',
        },
    },
    QuizButtons: {
        display: 'flex',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    }
}));

const TOTAL_QUESTION = 10;

export const Quiz: React.FC<PageProps> = ({ userData, setRegistered }) => {
    const classes = useStyles();
    const [loading, SetLoading] = useState(false)
    const [questions, setQuestions] = useState<QuestionState[]>([])
    const [number, setNumber] = useState(0)
    const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([])
    const [score, setScore] = useState(0)
    const [gameOver, setGameOver] = useState(true)

    const StartQuiz = async () => {
        SetLoading(true)
        setGameOver(false)

        const newQuestions = await fetchQuestions(
            TOTAL_QUESTION,
            userData.category,
            userData.difficulty,
        );

        setQuestions(newQuestions);
        setScore(0);
        setUserAnswers([]);
        setNumber(0)
        SetLoading(false);
    };

    const nextQuestion = async () => {
        const nextNumber = number + 1;

        if (nextNumber === TOTAL_QUESTION) {
            setGameOver(true);
        } else {
            setNumber(nextNumber);
        }
    }

    const Reset = () => {
        setRegistered(false)
    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            const answer = e.currentTarget.value;
            const correct = questions[number].correct_answer === answer;

            if (correct) setScore((prev) => prev + 1)

            const answerObject = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer,
            };
            setUserAnswers((prev) => [...prev, answerObject]);
        }
    };

    return (

        <div className={classes.root}>
            <Typography variant="h2" className={classes.Heading} gutterBottom>Quiz</Typography>

            {questions.length !== 0 && userAnswers.length === questions.length ? (
                <div className={classes.Score}>
                    <Typography variant="h5" className={classes.Result}>Result</Typography>
                    <Typography variant="h6"> Score: <b>{score}/{TOTAL_QUESTION}</b>
                        <br />
                        Percentage: <b>{((score * 100) / TOTAL_QUESTION).toFixed(2)}%</b>
                    </Typography>
                </div>
            ) : null}

            <div className={classes.QuizInfo}>
                <div><Typography variant="h5" className={classes.QuizDetail} gutterBottom>Category: <b>{userData.category}</b></Typography></div>
                {!gameOver && userAnswers.length !== TOTAL_QUESTION ?
                    <div><Typography variant="h5" className={classes.QuizDetail} gutterBottom>Score: <b>{score} / {TOTAL_QUESTION}</b></Typography></div>
                    : null}
                <div><Typography variant="h5" className={classes.QuizDetail} gutterBottom>Difficulty: <b>{userData.difficulty}</b></Typography></div>
            </div>

            {gameOver || userAnswers.length === TOTAL_QUESTION ? (
                <div>
                    <Typography variant='h4' className={classes.Body} gutterBottom>Hello <b> Mr. {userData.name} </b> Lets start Quiz.</Typography>
                </div>
            ) : null}

            {gameOver || userAnswers.length === TOTAL_QUESTION ?
                <div className={classes.QuizButtons}>
                    <Button onClick={StartQuiz} className={classes.StartButton} variant="contained" color="primary">
                        {userAnswers.length === TOTAL_QUESTION ? "Try Again" : "Start Quiz"}
                    </Button>
                    <Button onClick={Reset} className={classes.ResetButton} variant="contained" color="primary">
                        New Quiz
                    </Button>
                </div>
            : null}

            {loading ? <Typography variant="h5" gutterBottom>Loading...</Typography> : null}

            {!loading && !gameOver && userAnswers.length !== TOTAL_QUESTION ? (
                <QuestionCard
                    questionNum={number + 1}
                    totalQuestion={TOTAL_QUESTION}
                    question={questions[number].question}
                    answers={questions[number].answerOptions}
                    userAnswer={userAnswers ? userAnswers[number] : undefined}
                    callback={checkAnswer}
                />
            ) : null}

            {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTION - 1 ? (
                <Button onClick={nextQuestion} className={classes.button} variant="contained" color="primary">Next</Button>
            ) : null}
        </div>
    )
}