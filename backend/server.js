
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

let tasks = [];
let id = 1;

// GET all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// POST a task
app.post('/tasks', (req, res) => {
  const newTask = { id: id++, ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// DELETE a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = +req.params.id;
  tasks = tasks.filter(task => task.id !== taskId);
  res.status(204).send();
});

// PUT (update) a task
app.put('/tasks/:id', (req, res) => {
  const taskId = +req.params.id;
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ error: 'Task not found' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});

