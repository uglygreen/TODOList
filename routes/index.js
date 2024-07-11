const express = require('express');
const router = express.Router();

const taskController = require('../controllers/taskController')

module.exports =function() {
    router.post('/task', taskController.newTask);
    router.get('/task', taskController.getTask);
    router.put('/task/:id', taskController.updateTask);
    router.delete('/task/:id', taskController.deleteTask);

    return router;
}