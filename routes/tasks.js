import express from 'express';
import { connectToDatabase, getDatabaseClient } from '../routes/database.js';

const tasks = express.Router();
await connectToDatabase();
const db = getDatabaseClient();

// GET all tasks
tasks.get('/', async (req, res) => {
  try {
    const result = await db.collection('Tasks').find().toArray();
    res.send(result);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).send('Internal Server Error');
  }
});

// GET a specific task by ID
tasks.get('/:taskId', async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const result = await db.collection('Tasks').findOne({ _id: taskId });
    if (result) {
      res.send(result);
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error('Error fetching task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST a new task
tasks.post('/', async (req, res) => {
  try {
    const result = await db.collection('Tasks').insertOne(req.body);
    res.send(result.ops[0]);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// PUT/UPDATE a task by ID
tasks.put('/:taskId', async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const result = await db
      .collection('Tasks')
      .updateOne({ _id: taskId }, { $set: req.body });

    if (result.matchedCount > 0) {
      res.send({ message: 'Task updated successfully' });
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error('Error updating task:', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE a task by ID
tasks.delete('/:taskId', async (req, res) => {
  const taskId = req.params.taskId;

  try {
    const result = await db.collection('Tasks').deleteOne({ _id: taskId });

    if (result.deletedCount > 0) {
      res.send({ message: 'Task deleted successfully' });
    } else {
      res.status(404).send('Task not found');
    }
  } catch (error) {
    console.error('Error deleting task:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default tasks;
