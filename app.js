const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const contentRouter = require("./content/content.routes");


// Connect to DB
require('dotenv').config();
var mongoDB = `${process.env.MONGO_URI}${process.env.MONGO_DB_NAME}`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const app = express();
app.use(bodyParser.json())

app.use("/content", contentRouter);
app.get("/", (req, res) => {
    res.send("Hey There! General Kenobi");
})


app.listen(3001, () => console.log("listening"))