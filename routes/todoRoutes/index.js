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
router.get('/', getAllTodos);
//Returns todo based on the id provided in params
router.get('/:id', getTodoById);
//Adds new todo
router.post('/', addTodo);
//Edits the entire todo based on the id provided in params
router.put('/:id', updateTodoById);
//Deletes todo based on the id provided in params
router.delete('/:id', deleteTodoById);
//Patches todo based on the id provided in params
router.patch('/:id', patchTodo);

export default router;
