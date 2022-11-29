const express = require("express");
const router = express.Router();
const {
  getUsers,
  getUserID,
  setUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/get").get(getUsers);
router.route("/post").post(setUser);
router.route("/get/:id").get(getUserID);
router.route("/update/:id").put(updateUser);
router.route("/remove/:id").delete(deleteUser);

module.exports = router;
