const mongoose = require("mongoose");
var shortId = require('short-id');

const quizSchema = mongoose.Schema({
    topic_id: {
        type: String,
        required: true
    },
    short_id: {
        type: String, 
        unique: true,
        default: shortId.generate
    }, 
    questions: [],
    participants: [],
    is_started: {
        type: Boolean,
        default: false
    }
})

const Quiz = mongoose.model("Quiz", quizSchema);
module.exports = Quiz;