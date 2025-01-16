import express from "express";
import { fetchUser } from '../middleware/fetchUser.js';


import { discussionpost, getdiscussion, searchdiscussion } from "../controllers/discussion.js";

const router = express.Router();

router.post('/discussionpost', fetchUser, discussionpost)
router.post('/getdiscussion', getdiscussion)
router.post('/searchdiscussion', searchdiscussion)

export default router;