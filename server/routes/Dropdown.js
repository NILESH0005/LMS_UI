import express from 'express';
import { getDropdownValues, getQuizGroupDropdown } from '../controllers/dropdown.js';  // Make sure the path is correct

const router = express.Router();

router.get('/getDropdownValues', getDropdownValues);
router.get('/getQuizGroupDropdown', getQuizGroupDropdown);


export default router;
