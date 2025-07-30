const express = require('express');
const router = express.Router();
const Task = require('../models/task.cjs');

// CREATE
router.post('/', async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ALL
router.get('/', async (req, res) => {
  const tasks = await Task.findAll();
  res.json(tasks);
});

// GET BY ID
router.get('/:id', async (req, res) => {
  const task = await Task.findByPk(req.params.id);
  task ? res.json(task) : res.status(404).json({ error: 'Task not found' });
});

// UPDATE
router.put('/:id', async (req, res) => {
  const [updated] = await Task.update(req.body, {
    where: { id: req.params.id }
  });
  updated ? res.json({ message: 'Task updated' }) : res.status(404).json({ error: 'Task not found' });
});

// DELETE
router.delete('/:id', async (req, res) => {
  const deleted = await Task.destroy({
    where: { id: req.params.id }
  });
  deleted ? res.json({ message: 'Task deleted' }) : res.status(404).json({ error: 'Task not found' });
});

module.exports = router;