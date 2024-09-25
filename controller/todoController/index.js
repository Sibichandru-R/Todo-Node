import {
  createTodo,
  editTodoById,
  patchTodobyId,
  removeTodoById,
  showAllTodo,
  showTodoById,
} from '../../dao/todo.js';
import { statusCodes } from '../../constants.js';
import express from 'express';
/**
 * @name getAllTodos
 * @param {express.Request} req
 * @param {express.Response} res
 * @description Calls dao to return all todos in the list
 */
export const getAllTodos = (req, res, next) => {
  try {
    throw new Error('hi');
    const todos = showAllTodo();
    res.status(statusCodes.success).json({ todos: todos });
  } catch (error) {
    next(error);
  }
};
/**
 * @name getTodoById
 * @param {express.Request} req
 * @param {express.Response} res
 * @description Calls dao to return the todo that matches the id, If not will return error message
 */
export const getTodoById = (req, res) => {
  const id = req?.params?.id;
  if (id) {
    const data = showTodoById(id);
    if (data.status == 200) {
      res.status(statusCodes.success).json({ todo: data?.todo });
    } else res.status(statusCodes.notFound);
    res.json({ message: 'Cannot Find Todo With Id Provided' });
  } else res.status(statusCodes.badRequest);
  res.json({ message: 'Id Field Cannot Be Empty ' });
};
/**
 * @name addTodo
 * @param {express.Request} req
 * @param {express.Response} res
 * @description Calls dao to add new todo by sending the request body as a parameter
 */
export const addTodo = (req, res) => {
  createTodo(req?.body);
  res.status(statusCodes.created).json({ message: 'Todo added successfully' });
};
/**
 * @name updateTodoById
 * @param {express.Request} req
 * @param {express.Response} res
 * @description Calls the dao to update the todo based on the provided id in params
 */
export const updateTodoById = (req, res) => {
  const id = req?.params?.id;
  const updateTodo = req?.body;
  if (id) {
    const updatehandler = editTodoById(id, updateTodo);
    if (updatehandler.status == 200) {
      res
        .status(statusCodes.success)
        .json({ message: 'Todo Updated Successfully' });
    } else
      res
        .status(statusCodes.notFound)
        .json({ message: 'Cannot Update Todo That Does Not Exist' });
  } else
    res
      .status(statusCodes.badRequest)
      .json({ message: 'Id Field Cannot Be Empty ' });
};
/**
 * @name patchTodo
 * @param {express.Request} req
 * @param {express.Response} res
 * @description Calls the dao to patch the todo based on the provided id in params
 */
export const patchTodo = (req, res) => {
  const id = req?.params?.id;
  const patchValue = req?.body;
  if (id && patchValue) {
    const patchhandler = patchTodobyId(id, patchValue);
    if (patchhandler.status == 200) {
      res
        .status(statusCodes.success)
        .json({ message: 'Todo Patched Successfully' });
    } else
      res
        .status(statusCodes.notFound)
        .json({ message: 'Cannot Patch Todo That Does Not Exist' });
  } else
    res
      .status(statusCodes.badRequest)
      .json({ message: 'Id Field Cannot Be Empty ' });
};
/**
 * @name deleteTodoById
 * @param {express.Request} req
 * @param {express.Response} res
 * @description Calls the dao to delete the todo based on the provided id in params
 */
export const deleteTodoById = (req, res) => {
  const id = req?.params?.id;
  if (id) {
    const deleteHandler = removeTodoById(id);
    if (deleteHandler.status == 200) {
      res.status(statusCodes.success).json({ message: 'Deleted Successfully' });
    } else
      res
        .status(statusCodes.notFound)
        .json({ message: 'Cannot Delete Todo That Does Not Exist' });
  } else
    res
      .status(statusCodes.badRequest)
      .json({ message: 'Id Field Cannot Be Empty ' });
};
