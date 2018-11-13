'use strict'
const mongoose = require('mongoose');
const { Schema } = mongoose;

const TaskSchema = new Schema({
    title: {type: String, required: true, lowercase: true},
    description: {type: String, required: true, lowercase: true},
    created_date:{type: Date, default:Date.now()},
    lifetime:{type: String, lowercase: true},
    task_status:{type:String, lowercase: true}

});


module.exports = mongoose.model('Task', TaskSchema);

