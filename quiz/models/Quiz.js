const mongoose = require("mongoose");

const quizSchema = mongoose.Schema({
    topic_id: {
        type: String,
        required: true
    },
    questions: []
})

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;