import Todo from "../models/Todo.js";
import express from "express";
const todoRouter = express.Router();

todoRouter.get("/", async (req, res) => {
    try {
        const todos = await Todo.find({ owner: req.user.userId });

        console.log("req.user =", req.user);
        console.log("req.user.userId =", req.user?.userId);
        if (!todos) {
            return res.status(401).json({
                message: 'Can not find any todo for current user'
            })
        }
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

todoRouter.post("/", async (req, res) => {
    const todo = new Todo({
        task: req.body.task,
        time: req.body.time,
        completed: req.body.completed,
        owner: req.user.userId
    });

    try {
        const savedTodo = await todo.save();
        res.status(201).json(savedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

todoRouter.delete("/:id", async (req, res) => {

    const id = req.params.id;
    try {
        const result = await Todo.findByIdAndDelete(id);
        if (!result) {
            return res.status(404).json({
                message: "Can't find the id"
            })
        }
        res.status(200).json({
            message: "Delete sucessfully"
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

todoRouter.patch("/:id", async (req, res) => {
    const id = req.params.id;
    const { time } = req.body;

    try {
        const result = await Todo.findByIdAndUpdate(id, { time }, { new: true });
        if (!result) {
            return res.status(404).json({
                message: "Can't update data"
            });
        }
        res.status(200).json({
            message: "Update data successfully.",
            data: result
        })
    }
    catch (err) {
        res.status(500).json({
            message: err.message
        })
    }
});

export default todoRouter;