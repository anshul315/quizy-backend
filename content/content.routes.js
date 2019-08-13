const express = require("express");
const contentController = require('./content.controller');
let router = express.Router();

router.get("/topics", contentController.getTopics);
router.post("/topic", contentController.createTopic);

module.exports = router