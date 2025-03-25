import express from "express";
import { fetchUser } from '../middleware/fetchUser.js';
import { createQuiz, getQuizzes, deleteQuiz, createQuestion, getQuestion, deleteQuestion, getQuestionsByGroup } from "../controllers/quiz.js";

const router = express.Router();

router.post('/createQuiz', fetchUser, createQuiz)
router.post('/deleteQuiz', fetchUser, deleteQuiz)
router.get('/getQuizzes', fetchUser, getQuizzes)
router.post('/createQuestion', fetchUser, createQuestion)
router.get('/getQuestion', fetchUser, getQuestion)
router.post('/deleteQuestion', fetchUser, deleteQuestion)
router.post('/getQuestionsByGroup', fetchUser, getQuestionsByGroup)






export default router;




























  const fetchQuizLevels = async () => {
    setLoading(prev => ({ ...prev, levels: true }));
    try {
      const endpoint = `dropdown/getDropdownValues?category=quizLevel`;
      const method = "GET";
      const headers = {
        "Content-Type": "application/json",
        "auth-token": userToken,
      };

      const data = await fetchData(endpoint, method, headers);
      console.log("Fetched quiz levels:", data);
      if (data.success) {
        // Transform the data to ensure consistent structure
        const transformedLevels = data.data.map(item => ({
          value: item.idCode || item.ddValue || item.value || item,
          label: item.ddValue || item.idCode || item.label || item
        }));
        setQuizLevels(transformedLevels);
      } else {
        Swal.fire("Error", "Failed to fetch quiz levels.", "error");
      }
    } catch (error) {
      console.error("Error fetching quiz levels:", error);
      Swal.fire("Error", "Error fetching quiz levels.", "error");
    } finally {
      setLoading(prev => ({ ...prev, levels: false }));
    }
  };