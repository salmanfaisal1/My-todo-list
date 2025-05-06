const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

let tasks = [];
let idCounter = 1;

// Add a new task
app.post('/addTask', (req, res) => {
    const { taskName } = req.body;
    if (!taskName) return res.status(400).send({ error: "taskName is required" });

    const newTask = { id: idCounter++, taskName };
    tasks.push(newTask);
    res.status(201).send(newTask);
});

// Show all tasks
app.get('/tasks', (req, res) => {
    res.send(tasks);
});

// Delete a task by ID
app.delete('/task/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.send({ message: `Task with id ${taskId} deleted.` });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
