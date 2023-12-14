import express from 'express';
import { connectToDatabase, getDatabaseClient } from '../routes/database.js';

const categories = express.Router();
await connectToDatabase();
const db = getDatabaseClient();

// GET all categories
categories.get('/', async (req, res) => {
  try {
    const result = await db.collection('Categories').find().toArray();
    res.send(result);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Internal Server Error');
  } 

});

// GET a specific category by ID
categories.get('/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const result = await db.collection('Categories').findOne({ _id: categoryId });
    if (result) {
      res.send(result);
    } else {
      res.status(404).send('Category not found');
    }
  } catch (error) {
    console.error('Error fetching category:', error);
    res.status(500).send('Internal Server Error');
  }
});

// POST a new category
// categories.post('/', async (req, res) => {
//   try {
//     const result = await db.collection('Categories').insertOne(req.body);
//     res.send(result.ops[0]);
//   } catch (error) {
//     console.error('Error creating category:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });

//----
categories.post('/',async (req,res) => {
    console.log(req.body);

    db.collection('Categories').insertOne(req.body);
    res.send(req.body);
});



// PUT/UPDATE a category by ID
categories.put('/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const result = await db
      .collection('Categories')
      .updateOne({ _id: categoryId }, { $set: req.body });

    if (result.matchedCount > 0) {
      res.send({ message: 'Category updated successfully' });
    } else {
      res.status(404).send('Category not found');
    }
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).send('Internal Server Error');
  }
});

// DELETE a category by ID
categories.delete('/:categoryId', async (req, res) => {
  const categoryId = req.params.categoryId;

  try {
    const result = await db.collection('Categories').deleteOne({ _id: categoryId });

    if (result.deletedCount > 0) {
      res.send({ message: 'Category deleted successfully' });
    } else {
      res.status(404).send('Category not found');
    }
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).send('Internal Server Error');
  }
});

export default categories;
