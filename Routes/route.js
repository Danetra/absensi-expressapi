const router = require("express").Router();
const client = require("./../postgree");
const {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
} = require("../Controllers/Users/users");
const { loginUsers, signUp } = require("../Controllers/Auth/auth");
const { postPresence } = require("../Controllers/Presence/epresence");

router.get("/", async (req, res) => {
  res.status(200).json("API Latihan Node JS");
});

router.post("/login", loginUsers);
router.post("/register", signUp);

// user routes
router.get("/users", getUsers);
router.post("/users", postUsers);
router.put("/users/update/:id", updateUsers);
router.delete("/users/delete/:id", deleteUsers);

// presence
router.post("/presence", postPresence);

module.exports = router;
