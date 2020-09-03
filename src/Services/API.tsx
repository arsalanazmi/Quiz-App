import { Question } from '../Types/QuizTypes';
import { shuffleArray } from '../Utilities'

export const fetchQuestions = async (totalQuestions: number, category: any, Difficulty: string) => {
    const url = `https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&difficulty=${Difficulty}&type=multiple`;
    const data = await (await fetch(url)).json();
    return data.results.map((question: Question) => (
        {
            ...question,
            answerOptions: shuffleArray([...question.incorrect_answers, question.correct_answer])
        }
        ))
}

export const fetchCategory = async () => {
    const endpoint = `https://opentdb.com/api_category.php`;
    const data = await (await fetch(endpoint)).json();
    return data.trivia_categories;
};

export enum Difficulty {
    EASY = 'easy',
    MEDIUM = 'medium',
    HARD = 'hard'
}