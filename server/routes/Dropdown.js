import express from 'express';
import { getDropdownValues } from '../controllers/dropdown.js';  // Make sure the path is correct

const router = express.Router();

// Define the route for fetching dropdown values
router.get('/getDropdownValues', getDropdownValues);

export default router;
