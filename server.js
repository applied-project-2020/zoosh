#!/usr/bin/env node

const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const app = express();
const path = require("path")

require('dotenv').config();


// Port Environment variable
const PORT = process.env.PORT || 4000;

// Access cluster through link
const mongoDB = process.env.MONGO_DB;

mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
    autoIndex: false
});

//Use headers to give browser access to resources
app.use(cors());
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

if(process.env.NODE_ENV === 'production') {
    app.use(express.static('./Client/build')
}

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json
app.use(bodyParser.json({
    limit: '5mb',
    extended: true
}))

// Add the "Users" route to the server.
var Users = require('./routes/Users');
app.use('/users', Users)

// Adds the "Discussions" route to the server.
var Discussions = require('./routes/Discussions');
app.use('/discussions', Discussions)

// Adds the "Notifications" route to the server.
var Notifications = require('./routes/Notifications');
app.use('/notifications', Notifications)

// Adds the "Societies" route to the server.
var Societies = require('./routes/Societies');
app.use('/societies', Societies);

// Adds the "Forums" route to the server.
var Forums = require('./routes/Forums');
app.use('/forums', Forums);

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "Client", "build", "index.html"));
});

//log connection to server
app.listen(PORT, () => {
    console.log("[Server]::LISTEN:%s", PORT);
});