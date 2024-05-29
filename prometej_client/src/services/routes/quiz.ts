import axios from "axios";

import { endpoints } from "../endpoints";
import { CreateQuizPayload, UpdateQuizPayload } from "../../store/slices/quizSlice";


const { quiz } = endpoints;

export default {
  getAll: () => axios.get(`${quiz.base}/getAll`),
  getAllUserQuizzes: (userId: number) => axios.get(`${quiz.base}/getAllUserQuizzes/${userId}`),
  get: (quizId: number) => axios.get(`${quiz.base}/get/${quizId}`),
  create: (data: CreateQuizPayload) => axios.post(`${quiz.base}/create`, data),
  Update: (data: UpdateQuizPayload) => axios.put(`${quiz.base}/update`, data),
  delete: (quizId: number) => axios.delete(`${quiz.base}/delete/${quizId}`),
};