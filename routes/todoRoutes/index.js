import express from 'express';

import {
  addTodo,
  deleteTodoById,
  getAllTodos,
  getTodoById,
  patchTodo,
  updateTodoById,
} from '../../controller/todoController/index.js';

const router = express.Router();

//Returns all todo
router.get('/todo', getAllTodos);
//Returns todo based on the id provided in params
router.get('/todo/:id', getTodoById);
//Adds new todo
router.post('/todo', addTodo);
//Edits the entire todo based on the id provided in params
router.put('/todo/:id', updateTodoById);
//Deletes todo based on the id provided in params
router.delete('/todo/:id', deleteTodoById);
//Patches todo based on the id provided in params
router.patch('/todo/:id', patchTodo);

export default router;
