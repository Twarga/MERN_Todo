const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const todoRoutes = require('./routes/todoRoutes');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;
const userRoutes = require('./routes/userRoutes');

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req, res) => {
  res.send('Todo API is running...');
});

app.use('/api/todos', todoRoutes);
app.use('/api/users', userRoutes);

// Error Handling middleware
app.use(notFound);
app.use(errorHandler);

// Connect to database
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

startServer();