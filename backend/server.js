
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = Process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

let tasks = [];
let id = 1;


app.get('/tasks', (req, res) => {
  res.json(tasks);
});

/
app.post('/tasks', (req, res) => {
  const newTask = { id: id++, ...req.body };
  tasks.push(newTask);
  res.status(201).json(newTask);
});


app.delete('/tasks/:id', (req, res) => {
  const taskId = +req.params.id;
  tasks = tasks.filter(task => task.id !== taskId);
  res.status(204).send();
});


app.put('/tasks/:id', (req, res) => {
  const taskId = +req.params.id;
  const index = tasks.findIndex(task => task.id === taskId);
  if (index !== -1) {
    tasks[index] = { ...tasks[index], ...req.body };
    res.json(tasks[index]);
  } else {
    res.status(404).json({ error: 'Task not made' });
  }
});

app.listen(PORT, () => {
  console.log(`Check backend at http://localhost:${PORT}`);
});

