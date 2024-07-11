const Task = require('../models/Tasks');

let tasks = [];

exports.newTask = async (req, res) => {
    console.log(req.body);
    const { title, description, status } = req.body;

    const task = new Task(
        tasks.length + 1, 
        title,
        description,
        status || 'pendiente'
    );

    tasks.push(task); 

    res.status(201).json(task);
}

exports.getTask = async (req, res) => {
    res.json(tasks);
}

exports.updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description, status } = req.body;
    const task = tasks.find(task => task.id === parseInt(id));
    if (task) {
        task.title = title;
        task.description = description;
        task.status = status;
      res.json(task);
    } else {
      res.status(404).send('Todo not found');
    }
}


exports.deleteTask = async (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(204).send();
}