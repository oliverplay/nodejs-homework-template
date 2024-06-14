const mongoose = require("mongoose");
const app = require("./app");
const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connection successful");

    app.listen(PORT || 3000, () => {
      console.log(`Server is running on port ${PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error("Database connection error:", error.message);
    process.exit(1); 
  });
