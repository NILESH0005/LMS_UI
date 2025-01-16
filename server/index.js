import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import userRoutes from './routes/user.js';
import userDiscussion from './routes/Discussion.js';
import userEvent from './routes/EventAndWorkshop.js';
import userBlog from './routes/Blog.js';
import userProfile from './routes/UserProfile.js';
import { connectToDatabase } from './database/mySql.js'; // Removed unused closeConnection

dotenv.config(); // Load environment variables

const port = process.env.PORT || 8000; // Use logical OR for fallback

const app = express();

// CORS Configuration
app.use(
  cors({
    //origin: 'http://117.55.242.133:3000', // Replace with your client origin
	  origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true, // If cookies or auth headers are needed
  })
);

// Middleware to parse request bodies
app.use(express.json({ limit: '10mb' }));
app.use(bodyParser.json({ limit: '10mb' })); // Optional, express.json is usually enough
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/user', userRoutes);
app.use('/discussion', userDiscussion);
app.use('/eventandworkshop', userEvent);
app.use('/blog', userBlog);
app.use('/userprofile', userProfile);

// Connect to database and start server
connectToDatabase((err) => {
  if (err) {
    console.error('Failed to connect to the database. Exiting...');
    process.exit(1); // Exit with a failure code
  } else {
    console.log('Database connection successful.');

    // Start the server
    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  }
});

// Optional: Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
