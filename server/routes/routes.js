const express = require("express");
const router = express.Router();
const {
  getTodo,
  addTodo,
  deleteTodo,
} = require("../controllers/todoController");

router.get("/", getTodo);
router.post("/add", addTodo);
router.delete("/delete/:id", deleteTodo);

module.exports = router;
