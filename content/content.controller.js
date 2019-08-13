const Topic = require("./models/Topic");
const Question = require("./models/Question");

exports.getTopics = (req, res) => {
    Topic.find((error, topics) => {
        if(error){
            res.status(400)
        }
        res.json(topics)
    })
}

exports.createTopic = (req, res) => {
    topic = req.body
    Topic.create(topic, (err, created_Topic) => {
        if(err){
            console.log(err)
            res.status(400)
        }
        res.json(created_Topic)
    });
}

exports.getQuestionsForTopic = (req, res) => {
    let topic_id = req.params.topic_id;
    Question.find({topic_id: topic_id}, (error, topics) => {
        if(error){
            res.status(400)
        }
        res.json(topics)
    })
}


exports.createQuestion = (req, res) => {
    question = req.body
    Question.create(question, (err, created_question) => {
        if(err){
            console.log(err)
            res.status(400)
        }
        res.json(created_question)
    });
}
