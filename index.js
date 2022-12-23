const express = require("express");
const cors = require("cors");
const connectdb = require("./config/dbconfig.js");
const bodyParser = require("body-parser");
const { Client } = require("pg");
const router = require("./router");
const app = express();
const bcrypt = require("bcrypt");
const session = require("express-session");
const port = 3040;
const cookieParser = require("cookie-parser");

// memanggil function connectdb yang ada di file dbconfig
connectdb();

app.use(bodyParser.json());
app.use(
  session({
    secret: "secret k3y",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, //access-control-allow-credentials:true
    optionSuccessStatus: 200,
  })
);

// memanggil object router
app.use("/", router);

// menjalankan server
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

// Note:
// (Client App :REQUEST: ) => index -> router -> controller -> model -> Database
// (Server App :RESPONSE:) => model -> controller -> router -> index -> Client App
