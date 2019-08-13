const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    topic_id: {
        type: String,
        required: true
    },
    answers: [
        {
            title: {
                type: String,
                required: true
            },
            is_correct: {
                type: Boolean,
                required: true
            }
        }
    ]

})

const Question = mongoose.model("Question", questionSchema);

module.exports = Question;