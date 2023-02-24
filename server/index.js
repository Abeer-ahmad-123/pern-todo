const express = require('express');
const app = express();
const cors = require('cors');
const colors = require('colors');
const pool = require('./db');

app.use(cors());

//used to give access to req data
app.use(express.json());

app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );

    res.status(201).json({
      success: true,
      data: newTodo.rows[0],
      message: 'New Todo Created',
    });
  } catch (err) {
    console.error(err.message);
  }
});

//get all todos

app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    if (allTodos.rows.length > 0) {
      res
        .status(200)
        .json({ success: true, data: allTodos.rows, message: 'Todos Found' });
    } else {
      res.status(400).json({
        success: false,
        data: allTodos.rows,
        message: 'No Todos Found',
      });
    }
  } catch (err) {
    console.error(err.message);
  }
});

//get a todo

app.get('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);
    if (todo.rows.length > 0) {
      res.status(200).json({
        success: true,
        data: todo.rows[0],
        message: `Todo found with id ${id}`,
      });
    } else {
      res.status(400).json({
        success: false,
        data: todo.rows[0],
        message: `No Todo Found with id ${id}`,
      });
    }
  } catch (err) {
    console.error(err.message);
  }
});

//update a todo

app.put('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const { description } = req.body;
  const updateTodo = await pool.query(
    'UPDATE todo SET description = $1 WHERE todo_id = $2',
    [description, id]
  );
  if (updateTodo.rowCount === 1) {
    const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [
      id,
    ]);
    res.status(201).json({
      success: true,
      data: todo.rows[0],
      message: `Todo with id ${id} updated successfully`,
    });
  } else {
    res.status(400).json({
      success: false,
      data: [],
      message: `Todo with id ${id} not found`,
    });
  }
});

//delete a todo

app.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  const todo = await pool.query('SELECT * FROM todo WHERE todo_id = $1', [id]);
  if (todo.rows[0]) {
    await pool.query('DELETE FROM todo WHERE todo_id = $1', [id]);
    res.status(200).json({
      success: true,
      data: todo.rows[0],
      message: `Todo with id ${id} deleted successfully`,
    });
  } else {
    res.status(400).json({
      success: false,
      data: [],
      message: `Todo with id ${id} not found`,
    });
  }
});

app.listen(5000, () => {
  console.log('Server has started on port 5000'.underline.cyan);
});
