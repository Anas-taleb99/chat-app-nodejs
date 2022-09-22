const messageController = require("../controllers/messageControllers");

const router = require("express").Router();

router.post('/addmsg', messageController.addMessage);
router.post('/getmsg', messageController.getAllMessage);

module.exports = router;