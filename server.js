const mongoose = require('mongoose');
const app = require("./app");


const { DB_HOST, PORT } = process.env;
mongoose.Promise = global.Promise;

mongoose.set('strictQuery', true);
mongoose.connect(DB_HOST, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then( () => {
  console.log("Connect db")
  app.listen(PORT)
}

)
.catch(error => {
  console.log(error.message);
  process.exit(1)
})


