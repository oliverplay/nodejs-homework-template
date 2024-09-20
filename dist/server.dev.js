"use strict";

var app = require("./app");

var port = process.env.port || 3000;
app.listen(3000, function () {
  console.log("Server is running. Use our API on port: 3000");
});