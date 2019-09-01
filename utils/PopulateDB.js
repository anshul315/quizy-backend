const Topic = require("../content/models/Topic");
const Question = require("../content/models/Question");


// Connect to DB
require('dotenv').config();
const mongoose = require("mongoose");
var mongoDB = `mongodb://127.0.0.1:27017/quizy`;
console.log(mongoDB)
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const data = require("./db/entertainment.json")
const topicName = "ENTERTAINMENT"

Topic.findOne({"title": topicName}, (error, topic) => {
    console.log(topic)
    if(error || topic === null){
        let newTopic = Topic()
        newTopic.title = topicName
        Topic.create(newTopic, (err, createdTopic) => {
            if(err){
                console.log(err)
            }else{
                addQuestions(createdTopic._id);
            }
        });
    }else{
        addQuestions(topic);
    }
    
})


addQuestions = (topic) => {
    for(question of data){
        Question.findOne({title: question.question}, (err, existingQuestion) => {
            if(err || existingQuestion === null){
                newQuestion = Question()
                newQuestion.title = question.question
                let answers = []
                for (answer of question.answers){
                    answers.push({
                        title: answer,
                        is_correct: false
                    })
                }
                answers[question.answer].is_correct = true
                newQuestion.answers = answers
                newQuestion.topic_id = topic._id 
                console.log(newQuestion)
                
                Question.create(newQuestion, (err, createdQuestion) => {
                    console.log(err)
                    if(err){
                    }else{
                        console.log(createdQuestion)
                    }
                })

            }
        })
    }
}
