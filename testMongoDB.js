import mongoose from 'mongoose';
const DB_URI = process.env.DB_URI || "mongodb+srv://sorintene:1234qwer@test-cluster.jnsni.mongodb.net/db-contacts?retryWrites=true&w=majority"; // Replace with your connection string
const testDBConnection = async () => {
  try {
    await mongoose.connect(DB_URI); // Remove deprecated options
    console.log('MongoDB connected successfully');
    mongoose.disconnect(); // Disconnect after testing
  } catch (err) {
    console.error('Failed to connect to MongoDB:', err.message);
  }
};

testDBConnection();
