const express = require("express");
const quizController = require('./quiz.controller');
let router = express.Router();

router.post("/create/:topic_id", quizController.createQuiz);
router.post("/join/:quiz_short_id", quizController.joinQuiz);
router.get("/:quiz_id", quizController.getQuiz);

module.exports = router