import express from "express";
import { fetchUser } from '../middleware/fetchUser.js';
import {
  addParallaxText,
  getParallaxContent,
  setActiveParallaxText, 
  addContentSection,
  addNewsSection,
  addProjectShowcase,
} from "../controllers/home.js";

const router = express.Router();

router.post('/addParallaxText', fetchUser, addParallaxText);
router.post('/getParallaxContent', fetchUser, getParallaxContent);
router.post('/setActiveParallaxText', fetchUser, setActiveParallaxText);
router.post('/addContentSection', fetchUser, addContentSection);
router.post('/addNewsSection', fetchUser, addNewsSection);
router.post('/addProjectShowcase', fetchUser, addNewsSection);




export default router;