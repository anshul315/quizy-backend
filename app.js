const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const contentRouter = require("./content/content.routes");
const quizRouter = require("./quiz/quiz.routes");
const Quiz = require("./quiz/models/Quiz")


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

        Quiz.findOne({_id: data.quiz}, (error, quiz) => { 
            if(error){
                console.log(error)
                return
            }
            if(quiz.is_started === true){
                console.log("the quiz already started")
                return
            }
            let found = quiz.participants.find((participant) => {
                return participant.user_id === data.user_id
            })

    
            if(!found){
                quiz.participants.push({user_id:data.user_id, name: data.name})
                console.log(4)
                quiz.save((error, savedQuiz) => {
                    if(error){
                        console.log(error)
                    }
                    socket.join(data.quiz);
                    socket.broadcast.to(data.quiz).emit("player_connected", {data})
                })
            }else{
                socket.join(data.quiz);
                socket.broadcast.to(data.quiz).emit("player_connected", {data})
            }

        })
 
    });

    socket.on("start_quiz", function(data){
        Quiz.findOne({_id: data.quiz}, (error, quiz) => { 
            if(error){
                console.log(error)
                return
            }
            if(quiz.is_started === true){
                console.log("the quiz already started")
                return
            }
            quiz.is_started = true
            quiz.save((error, savedQuiz) => {
                if(error){
                    console.log(error)
                }
                io.sockets.emit("quiz_started", {data})
        })
        })

    });

    socket.on("question_answered", function(data){
        console.log(data)
        socket.broadcast.to(data.quiz).emit("question_answered", {data});

    });

});

