const express = require('express');
const moongoose = require('mongoose');
const cors = require('cors');
const TaskModel = require('./models/Tasks');

const app = express();
app.use(cors());
app.use(express.json());

moongoose.connect('mongodb://127.0.0.1:27017/taskdb')

app.get('/',(req,res)=>{
  TaskModel.find({})
  .then(tasks=>res.json(tasks))
  .catch(err=>res.json(err))
})

app.get('/getTask/:id',(req,res)=>{
  const id =req.params.id;
  TaskModel.findById({_id:id})
  .then(tasks=>res.json(tasks))
  .catch(err=>res.json(err))
})

app.put('/updateTask/:id', async (req, res) => {
   const id = req.params.id;
  TaskModel.findByIdAndUpdate({_id:id},{
    task : req.body.title,
    description: req.body.description

  })
  .then((data) => res.json(data))
  .catch((error) => res.json(error));
})

app.delete('/deleteTask/:id', (req, res) => {
  const id = req.params.id;
  TaskModel.findByIdAndDelete({_id:id})
  .then((data) => res.json(data))
  .catch((error) => res.json(error));
})

app.post('/createTask', async (req, res) => {
     TaskModel.create(req.body)
     .then((data) =>res.json(data))
     .catch((error) => res.json(error));
})

app.listen(3001, () => {
  console.log('Server is running on port 3001');
})