const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

// Middleware create task (POSTMAN: http://localhost:8080/create   ----  {"title": "Compras"})
router.post('/create', async (req, res) => { 
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get task by ID
router.get('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findById(req.params._id);
    if (!task) 
        return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark task as completed - Marcar tarea como completada
router.put('/markAsCompleted/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params._id, { completed: true }, { new: true });//findByIdAndUpdate: Es un método de Mongoose que busca un documento por su ID y lo actualiza.
    if (!task) 
        return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update Task- Actualizar tarea
router.put('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params._id, { title: req.body.title }, { new: true });//findByIdAndUpdate: Es un método de Mongoose que busca un documento por su ID y lo actualiza.
    if (!task) 
        return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete task 
router.delete('/id/:_id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params._id);// findByIdAndDelete: Es un método de Mongoose que busca un documento por su ID y lo elimina.
    if (!task) 
        return res.status(404).json({ message: 'Tarea no encontrada' });
    res.json({ message: 'Tarea eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;