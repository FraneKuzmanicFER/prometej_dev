export interface QuizBaseModel {
    id: number;
    title: string;
    creatorName: string;
    isPrivate: boolean;
    entryCode?: number;
}

export interface QuestionCreateRequest {
    questionTitle:string
    firstAnswer:string
    secondAnswer:string
    thirdAnswer:string
    fourthAnswer:string
    correctAnswer:string
    hintText:string
    exploreMore:string
}

export interface QuestionEditRequest {
    id: number;
    questionTitle:string
    firstAnswer:string
    secondAnswer:string
    thirdAnswer:string
    fourthAnswer:string
    correctAnswer:string
    hintText:string
    exploreMore:string
}

export interface QuizCreateRequest {
    title: string;
    isPrivate: boolean;
    creatorId: number;
    entryCode: number;
}

export interface QuizEditRequest {
    id: number;
    title: string;
    creatorId: number;
    isPrivate: boolean;
    entryCode?: number;
}

export interface QuizViewModel {
    id: number;
    title: string;
    isPrivate: boolean;
    creatorId: number;
    creatorName: string;
    entryCode?: number;
    questions: QuestionViewModel[];
}

export interface QuestionViewModel {
    id: number;
    questionTitle:string
    firstAnswer:string
    secondAnswer:string
    thirdAnswer:string
    fourthAnswer:string
    correctAnswer:string
    hintText:string
    exploreMore:string
}