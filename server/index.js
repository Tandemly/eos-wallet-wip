// server/index.js
"use strict";
const app = require("./app");
const { env, port } = require("./vars");
const mongoose = require("./db");

// open mongoose connection
mongoose.connect();

const PORT = port || process.env.PORT;

app.listen(PORT, () => {
  console.log(`[${env}] App listening on port ${PORT}!`);
});
