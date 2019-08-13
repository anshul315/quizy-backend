const express = require("express");
const contentController = require('./content.controller');
let router = express.Router();

router.get("/topics", contentController.getTopics);
router.post("/topic", contentController.createTopic);
router.post("/question", contentController.createQuestion);
router.get("/questions/:topic_id", contentController.getQuestionsForTopic);

module.exports = router