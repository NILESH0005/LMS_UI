import express from "express";
import { fetchUser } from '../middleware/fetchUser.js';
import { postSection } from "../controllers/home.js";


const router = express.Router();



router.post('/postSection', fetchUser, postSection)

export default router;

