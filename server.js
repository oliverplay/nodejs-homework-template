import dotenv from 'dotenv';
dotenv.config();

import { app, connectDB } from './app.js'; // Import the app instance and database connection function

const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Ensure MongoDB connection is established
if (process.env.NODE_ENV !== 'test') {
  connectDB();
}
