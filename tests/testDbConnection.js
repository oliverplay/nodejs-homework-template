const mongoose = require("mongoose");

const connectDB = async () => {
  // Dacă conexiunea este deja activă, nu mai încerca să o deschizi din nou
  if (mongoose.connection.readyState === 0) {
    // Conectează-te la baza de date de test
    await mongoose.connect("mongodb://localhost:27017/test_db", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

const disconnectDB = async () => {
  // Închide conexiunea la baza de date după ce s-au terminat testele
  await mongoose.connection.close();
};

module.exports = { connectDB, disconnectDB };
