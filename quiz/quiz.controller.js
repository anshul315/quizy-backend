const Topic = require("../content/models/Topic");
const Question = require("../content/models/Question");
const Quiz = require("./models/Quiz");

exports.createQuiz = (req, res) => {
    let topic_id = req.params.topic_id;
    console.log("here")
    Question.find({topic_id: topic_id}, (error, questions) => {
        params = req.body
        console.log(params)
        if(error){
            console.log(error)
            res.status(400)
        }

        quiz = Quiz()
        quiz.topic_id = topic_id;
        quiz.questions = questions;
        quiz.participants = [params]

        Quiz.create(quiz, (err, created_quiz) => {
            if(err){
                console.log(err)
                res.status(400)
            }
            console.log(created_quiz)
            res.json(created_quiz)
        });
        
    })
}


exports.joinQuiz = (req, res) => {
    let quiz_short_id = req.params.quiz_short_id;
    Quiz.findOne({short_id: quiz_short_id}, (error, quiz) => {
        params = req.body
        
        let found = quiz.participants.find((participant) => {
            return participant.user_id === params.user_id
        })

        if(!found){
            quiz.participants.push(params)
            quiz.save()
        }
        res.json(quiz)

    })
}



exports.getQuiz = (req, res) => {
    let quiz_id = req.params.quiz_id;
    console.log("here")
    Quiz.findOne({_id: quiz_id}, (error, quiz) => {
        if(error){
            res.status(400)
        }
        res.json(quiz)
    })
}