import express from "express";
// import { body } from 'express-validator';
import { fetchUser } from '../middleware/fetchUser.js'; // Optional, if you need user authentication
import { addEvent, getEvent } from "../controllers/eventandworkshop.js"; // Import your addEvent controller

const router = express.Router();

// Route for adding a new event
router.post('/addEvent', fetchUser, addEvent); // The fetchUser middleware can be used if you need to authenticate the user.
router.get('/getEvent', getEvent); // The fetchUser middleware can be used if you need to authenticate the user.

export default router; 