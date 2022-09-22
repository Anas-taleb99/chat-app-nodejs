const router = require("express").Router();
const userController = require("../controllers/userControllers");

router.post("/register", userController.register);

router.post("/login", userController.login);

router.post("/setavatar/:id", userController.setAvatar);

router.get("/allusers/:id", userController.getAllUsers);

module.exports = router;