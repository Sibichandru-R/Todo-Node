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

router.get('/todo', getAllTodos);
router.get('/todo/:id', getTodoById);
router.post('/todo', addTodo);
router.put('/todo/:id', updateTodoById);
router.delete('/todo/:id', deleteTodoById);
router.patch('/todo/:id', patchTodo);

export default router;
