export type Question = {
    category: string;
    correct_answer: string;
    difficulty: string;
    incorrect_answers: string[];
    question: string;
    type: string;
};
export type QuestionState = Question & { answerOptions: string[] };

export type AnswerObject = {
    question: string;
    answer: String;
    correct: boolean;
    correctAnswer: string;
}

export type UserDataProps = {
    setRegistered: Function;
    setUser: Function;
};

export type categoryArray = {
    id: number;
    name: string;
}

export type PageProps = {
    userData: any;
    setRegistered: Function;
};

export type CardProps = {
    questionNum: number;
    totalQuestion: number;
    question: string;
    answers: string[];
    userAnswer: any;
    callback: any;
}

export type ButtonWrapperProps = {
    correct: boolean;
    userClicked: boolean;
    key:number,
}