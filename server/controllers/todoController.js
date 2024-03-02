const todoModel = require("../models/todoSchema");

async function getTodo(req, res) {
  try {
    const todo = await todoModel.find();
    return res.json(todo);
  } catch (err) {
    return res
      .status(400)
      .json({ message: "Oops! Something went wrong.", err });
  }
}

async function addTodo(req, res) {
  try {
    const { todo } = await req.body;
    const Todo = new todoModel({
      todo: todo,
    });
    await Todo.save();
    return res.status(201).json({ message: "todo added successfully" });
  } catch (err) {
    return res.status(400).json({ message: "Could not add todo" });
  }
}

async function deleteTodo(req, res) {
  try {
    const id = req.params.id;
    const todo = await todoModel.findByIdAndDelete(id);
    return res.status(202).json(todo);
  } catch (err) {
    return res.status(400).json({ message: "Oops! Something went wrong." });
  }
}

module.exports = { getTodo, addTodo, deleteTodo };
