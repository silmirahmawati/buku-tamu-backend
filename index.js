const express = require('express')
const cors = require('cors')
const connectdb = require('./config/dbconfig.js')
const bodyParser = require('body-parser')
const { Client } = require("pg")
const router = require('./router')
const app = express()
const bcrypt = require('bcrypt')
const port = 3000

// memanggil function connectdb yang ada di file dbconfig
connectdb()

app.use(bodyParser.json());
app.use(cors());

// memanggil object router
app.use('/', router)

// menjalankan server
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// Note:
// (Client App :REQUEST: ) => index -> router -> controller -> model -> Database
// (Server App :RESPONSE:) => model -> controller -> router -> index -> Client App