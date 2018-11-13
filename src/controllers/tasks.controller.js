'use strict'

const taskModel = require('../models/task');
const tasksCtrl = {}

tasksCtrl.getTask = async (req, res) => {
    await taskModel.findById(req.params.id, (err, task)=>{
        if(err) return res.status(500).send({'msg':'Error finding task'})
        res.status(200).send({task})
    })
}


tasksCtrl.listTasks = async (req, res) => {
    await taskModel.find({}, (err, tasks) =>{
        if(err) return res.status(500).send({status:500, msg:'Error'})
        return res.status(200).send(tasks)
    })
}

tasksCtrl.addTask = async (req, res) => {
    const { title, description, lifetime, task_status } = req.body;
    const task = new taskModel({title, description, lifetime, task_status});
    await task.save((err)=>{
        if(err) return res.status(500).send({msg:'Error saving task'});
    });
    res.status(200).send({'msg':'Task Saved'});
}

tasksCtrl.updateTask = async (req, res) => {
    const { title, description, lifetime, task_status } = req.body;
    const newTask = { title, description, lifetime, task_status };
    await taskModel.findByIdAndUpdate(req.params.id, newTask, (err) => {
        if(err) return res.status(500).send({'msg':'Error updating case'})
    });
    res.status(200).send({'msg':`${title} was updated`})
}

tasksCtrl.removeTask = async ( req, res) => {
    await taskModel.findByIdAndDelete(req.params.id, (err)=>{
        if(err) return res.status(500).send({'msg':'Error deleting task'})
    });
    res.status(200).send({'msg':'Task Deleted'});    
}
   
module.exports = tasksCtrl;