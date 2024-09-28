import { app } from "./app.js";
// const app = require("./app"); converted ESM

app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
