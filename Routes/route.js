const router = require("express").Router();
const client = require("./../postgree");
const {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
} = require("../Controllers/users");
const { postPresence } = require("../Controllers/epresence");

router.get("/", async (res) => {
  res.status(200).json("API Latihan Node JS");
});

// user routes
router.get("/users", getUsers);
router.post("/users", postUsers);
router.put("/users/update/:id", updateUsers);
router.delete("/users/delete/:id", deleteUsers);

// presence
router.post("/presence", postPresence);

module.exports = router;
