import express from "express";
import { fetchUser } from '../middleware/fetchUser.js';


import { blogpost, getBlog, blogpost_bulk } from "../controllers/blog.js";

const router = express.Router();

router.post('/blogpost', fetchUser, blogpost)
router.post('/blogpost_bulk', fetchUser, blogpost_bulk)
router.post('/getBlog', getBlog)


export default router;