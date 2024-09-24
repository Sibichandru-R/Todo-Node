import {
  createTodo,
  editTodoById,
  patchTodobyId,
  removeTodoById,
  showAllTodo,
  showTodoById,
} from '../../dao/todo.js';
import express from 'express';
/**
 * @name getAllTodos
 * @param {express.Request} req
 * @param {express.Response} res
 * @description
 */
export const getAllTodos = (req, res) => {
  const todos = showAllTodo();
  res.status(200).json({ todos: todos });
};
/**
 * @name getTodoById
 * @param {express.Request} req
 * @param {express.Response} res
 * @description
 */
export const getTodoById = (req, res) => {
  const id = req?.params?.id;
  if (id) {
    const data = showTodoById(id);
    if (data.status == 200) {
      res.status(200).json({ todo: data?.todo });
    }
    res.status(404);
    res.json({ message: 'Cannot Find Todo With Id Provided' });
  }
  res.status(400);
  res.json({ message: 'Id Field Cannot Be Empty ' });
};
/**
 * @name addTodo
 * @param {express.Request} req
 * @param {express.Response} res
 * @description
 */
export const addTodo = (req, res) => {
  createTodo(req?.body);
  res.status(200).json({ message: 'Todo added successfully' });
};
/**
 * @name updateTodoById
 * @param {express.Request} req
 * @param {express.Response} res
 * @description
 */
export const updateTodoById = (req, res) => {
  const id = req?.params?.id;
  const updateTodo = req?.body;
  if (id && updateTodo) {
    const updatehandler = editTodoById(id, updateTodo);
    if (updatehandler.status == 200) {
      res.status(200).json({ message: 'Todo Updated Successfully' });
    }
    res.status(404).json({ message: 'Cannot Update Todo That Does Not Exist' });
  }
  res.status(400).json({ message: 'Id Field Cannot Be Empty ' });
};
/**
 * @name patchTodo
 * @param {express.Request} req
 * @param {express.Response} res
 * @description
 */
export const patchTodo = (req, res) => {
  const id = req?.params?.id;
  const patchValue = req?.body;
  if (id && patchValue) {
    const patchhandler = patchTodobyId(id, patchValue);
    if (patchhandler.status == 200) {
      res.status(200).json({ message: 'Todo Patched Successfully' });
    }
    res.status(404).json({ message: 'Cannot Patch Todo That Does Not Exist' });
  }
  res.status(400).json({ message: 'Id Field Cannot Be Empty ' });
};
/**
 * @name deleteTodoById
 * @param {express.Request} req
 * @param {express.Response} res
 * @description
 */
export const deleteTodoById = (req, res) => {
  const id = req?.params?.id;
  if (id) {
    const deleteHandler = removeTodoById(id);
    if (deleteHandler.status == 200) {
      res.status(200).json({ message: 'Deleted Successfully' });
    }
    res.status(404).json({ message: 'Cannot Delete Todo That Does Not Exist' });
  }
  res.status(400).json({ message: 'Id Field Cannot Be Empty ' });
};
