import express from "express";
import { fetchUser } from '../middleware/fetchUser.js';


import { discussionpost, getdiscussion, searchdiscussion, deleteDiscussion } from "../controllers/discussion.js";

const router = express.Router();

router.post('/discussionpost', fetchUser, discussionpost)
router.post('/getdiscussion', getdiscussion)
router.post('/searchdiscussion', searchdiscussion)
router.post('/deleteDiscussion', fetchUser, deleteDiscussion)


export default router;