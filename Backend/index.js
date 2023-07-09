const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

let tasks = [
  { id: 1, title: 'Task 1', status: 'pending' },
  { id: 2, title: 'Task 2', status: 'completed' },
  { id: 3, title: 'Task 3', status: 'pending' },
  { id: 4, title: 'Task 4', status: 'completed' },
  { id: 5, title: 'Task 5', status: 'pending' },
];

app.use(express.json());

app.get('/tasks', (req, res) => {
  const { status } = req.query;

  let filteredTasks = tasks;

  if (status) {
    if (status === 'pending') {
      filteredTasks = tasks.filter((task) => task.status === 'pending');
    } else if (status === 'completed') {
      filteredTasks = tasks.filter((task) => task.status === 'completed');
    } else {
      return res.status(400).json({ error: 'Invalid status parameter' });
    }
  }

  res.json(filteredTasks);
});

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
