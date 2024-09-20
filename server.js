import { app } from "./app.js";

const port = process.env.port || 3000;
app.listen(3000, () => {
  console.log("Server is running. Use our API on port: 3000");
});
