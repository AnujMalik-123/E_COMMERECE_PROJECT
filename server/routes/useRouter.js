const usectrl = require("../controller/usectrl");
const router = require("express").Router();
router.post("/register", usectrl.register);
router.post("/refresh_token", usectrl.refreshtoken);
router.post("/login", usectrl.login);
router.get("/logout", usectrl.logout);
const auth = require("../middleware/auth");
router.get("/infor", auth, usectrl.getuser);
module.exports = router;
