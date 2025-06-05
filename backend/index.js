const express = require('express');
const moongoose = require('mongoose');
const cors = require('cors');
const TaskModel = require('./models/Tasks');

const app = express();
app.use(cors());
app.use(express.json());

moongoose.connect('mongodb://127.0.0.1:27017/taskdb')

app.post('/createTask', async (req, res) => {
     TaskModel.create(req.body)
     .then((data) =>res.json(data))
     .catch((error) => res.json(error));
})

app.listen(3001, () => {
  console.log('Server is running on port 3001');
})