const Router = require("express").Router;
const userController = require("../controllers/user-controller");
const router = new Router();
const { body } = require("express-validator");
const authMiddleware = require("../middlewares/auth-middleware");
const loginMiddleware = require("../middlewares/login-middleware");

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 1, max: 100 }),
  userController.registration
);

router.post("/registration", userController.registration);
router.post("/login", loginMiddleware, userController.login);
router.post("/logout", userController.logout);
router.get("/refresh", userController.refresh);
router.get("/users", authMiddleware, userController.getUsers);
router.delete("/deleteUser", authMiddleware, userController.removeUser);
router.put("/block", userController.blockUser);
router.put("/unblock", userController.unblockUser);

module.exports = router;
