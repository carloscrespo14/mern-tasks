'use strict'

const express = require('express');
const router = express.Router();

//const Task = require('../models/task');
const tasksCtrl = require('../controllers/tasks.controller')

router.get('/tasks/:id', tasksCtrl.getTask);
router.get('/tasks', tasksCtrl.listTasks); 
router.post('/tasks', tasksCtrl.addTask);
router.put('/tasks/:id', tasksCtrl.updateTask);
router.delete('/tasks/:id', tasksCtrl.removeTask);

module.exports = router;