const express = require("express");
const quizController = require('./quiz.controller');
let router = express.Router();

router.post("/create/:topic_id", quizController.createQuiz);

module.exports = router