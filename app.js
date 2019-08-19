const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const contentRouter = require("./content/content.routes");
const quizRouter = require("./quiz/quiz.routes");


// Connect to DB
require('dotenv').config();
var mongoDB = `${process.env.MONGO_URI}${process.env.MONGO_DB_NAME}`;
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


const app = express();

app.use(bodyParser.json())
app.use(cors())

app.use("/content", contentRouter);
app.use("/quiz", quizRouter);
app.get("/", (req, res) => {
    res.send("Hey There! General Kenobi");
})

var server = app.listen(3001, () => console.log("listening"))
var io = require('socket.io').listen(server);

io.on('connection', function(socket){
    console.log('a user connected');

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    
    socket.on('quiz', function(data) {
        socket.join(data.quiz);
        console.log(data.quiz)
    });

    socket.on("question_answered", function(data){
        console.log(data)
        socket.broadcast.to(data.quiz).emit("question_answered", {data});

    });

});

