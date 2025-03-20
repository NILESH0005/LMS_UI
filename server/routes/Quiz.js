import express from "express";
import { fetchUser } from '../middleware/fetchUser.js';
import { createQuiz, getQuizzes, deleteQuiz, createQuestion } from "../controllers/quiz.js";

const router = express.Router();

router.post('/createQuiz', fetchUser, createQuiz)
router.post('/deleteQuiz', fetchUser, deleteQuiz)
router.get('/getQuizzes', fetchUser, getQuizzes)
router.post('/createQuestion', fetchUser, createQuestion)




export default router;