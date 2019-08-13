const Topic = require("../content/models/Topic");
const Question = require("../content/models/Question");
const Quiz = require("./models/Quiz");

exports.createQuiz = (req, res) => {
    let topic_id = req.params.topic_id;
    console.log("here")
    Question.find({topic_id: topic_id}, (error, questions) => {
        if(error){
            console.log(error)
            res.status(400)
        }

        quiz = Quiz()
        quiz.topic_id = topic_id;
        quiz.questions = questions;

        Quiz.create(quiz, (err, created_quiz) => {
            if(err){
                console.log(err)
                res.status(400)
            }
            res.json(created_quiz)
        });
        
    })
}