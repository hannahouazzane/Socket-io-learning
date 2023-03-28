const roomMethods = require("./startGame");
const express = require("express");

/// defines the express server? Express.js, or simply Express, is a back end web application framework for building RESTful APIs with Node.js
const app = express();
const cors = require("cors");

app.use(cors);
const http = require("http").createServer(app);

const io = require("socket.io")(http, {
  cors: {
    orign: "*",
  },
});
