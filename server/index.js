import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import path from 'path';
import userRoutes from './routes/user.js';
import userDiscussion from './routes/Discussion.js';
import userEvent from './routes/EventAndWorkshop.js';
import userBlog from './routes/Blog.js';
import userProfile from './routes/UserProfile.js';
import dropdownRoutes from './routes/Dropdown.js';
import { connectToDatabase } from './database/mySql.js';
import homeRoutes from './routes/Home.js';
import quizRoutes from './routes/Quiz.js';

dotenv.config();

const port = process.env.PORT || 8000;
const app = express();

// Multer configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/gifs');
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// CORS Configuration
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  })
);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Serve static files
app.use('/gifs', express.static('uploads/gifs'));

// Routes
app.use('/user', userRoutes);
app.use('/discussion', userDiscussion);
app.use('/eventandworkshop', userEvent);
app.use('/blog', userBlog);
app.use('/userprofile', userProfile);
app.use('/dropdown', dropdownRoutes);
app.use('/addUser', userRoutes);
app.use('/home', homeRoutes);
app.use('/quiz', quizRoutes);


// Database connection
connectToDatabase((err) => {
  if (err) {
    console.error('Failed to connect to the database. Exiting...');
    process.exit(1);
  } else {
    console.log('Database connection successful.');
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});