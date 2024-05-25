import axios from "axios";

import { endpoints } from "../endpoints";

const { quiz } = endpoints;

export default {
  getAll: () => axios.get(`${quiz.base}/getAll`),
  getAllUserQuizzes: (userId: number) => axios.get(`${quiz.base}/getAllUserQuizzes/${userId}`),
};