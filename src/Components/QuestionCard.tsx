import React from 'react'
import { CardProps } from '../Types/QuizTypes'
import { makeStyles, Paper, Typography, Button } from "@material-ui/core";
import { ButtonWrapper } from './Styles/QuestionCard.styles'

const useStyles = makeStyles((theme) => ({
    Paper: {
        width: '60%',
        backgroundColor: '#c3d4db',
        padding: '3%',
        margin: '3% auto',
        textAlign: 'center',
        [theme.breakpoints.down("sm")]: {
            width: '80%'
        },
        [theme.breakpoints.down("xs")]: {
            width: '95%'
        },
    },
    CardContent: {
        fontWeight: 'bold',
    }
}));

export const QuestionCard: React.FC<CardProps> = ({ questionNum, totalQuestion, question, answers, userAnswer, callback }) => {
    const classes = useStyles();

    return (
        <Paper className={classes.Paper}>
            <Typography variant='h5' className={classes.CardContent} gutterBottom> Question: {questionNum} / {totalQuestion} </Typography>
            <Typography variant="h6" className={classes.CardContent} gutterBottom>
                <span dangerouslySetInnerHTML={{ __html: question }} />
            </Typography>
            <div>{answers.map((answer, id) => (
                <ButtonWrapper
                    correct={userAnswer?.correctAnswer === answer}
                    userClicked={userAnswer?.answer === answer}
                    key={id}
                >
                    <Button disabled={userAnswer} value={answer} onClick={callback}>
                        <span dangerouslySetInnerHTML={{ __html: answer }} />
                    </Button>
                </ButtonWrapper>
            ))}
            </div>
        </Paper>
    )
}