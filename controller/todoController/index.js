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
import logger from '../../middlewares/logger.js';
/**
 * @name getAllTodos
 * @param {express.Request} req
 * @param {express.Response} res
 * @description Calls dao to return all todos in the list
 */
export const getAllTodos = async (req, res, next) => {
  try {
    const todos = await showAllTodo();
    res.status(statusCodes.success).json({ todos });
    logger.log({
      level: 'info',
      message: 'Hello distributed log files!',
    });

    logger.info('Hello again distributed logs');
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
export const getTodoById = async (req, res, next) => {
  const id = req?.params?.id;
  try {
    if (id) {
      const data = await showTodoById(id);
      if (data.status == 200) {
        res.status(statusCodes.success).json({ todo: data?.todo });
      } else res.status(statusCodes.notFound);
      res.json({ message: 'Cannot Find Todo With Id Provided' });
    } else res.status(statusCodes.badRequest);
    res.json({ message: 'Id Field Cannot Be Empty ' });
  } catch (error) {
    next(error);
  }
};
/**
 * @name addTodo
 * @param {express.Request} req
 * @param {express.Response} res
 * @description Calls dao to add new todo by sending the request body as a parameter
 */
export const addTodo = async (req, res, next) => {
  try {
    await createTodo(req?.body);
    res
      .status(statusCodes.created)
      .json({ message: 'Todo added successfully' });
  } catch (error) {
    next(error);
  }
};

/**
 * @name updateTodoById
 * @param {express.Request} req
 * @param {express.Response} res
 * @description Calls the dao to update the todo based on the provided id in params
 */
export const updateTodoById = async (req, res, next) => {
  const id = req?.params?.id;
  const updateTodo = req?.body;
  try {
    if (id) {
      const updatehandler = await editTodoById(id, updateTodo);
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
  } catch (error) {
    next(error);
  }
};
/**
 * @name patchTodo
 * @param {express.Request} req
 * @param {express.Response} res
 * @description Calls the dao to patch the todo based on the provided id in params
 */
export const patchTodo = async (req, res, next) => {
  const id = req?.params?.id;
  const patchValue = req?.body;
  try {
    if (id && patchValue) {
      await patchTodobyId(id, patchValue);
      res
        .status(statusCodes.success)
        .json({ message: 'Todo Patched Successfully' });
    }
  } catch (error) {
    next(error);
  }
};
/**
 * @name deleteTodoById
 * @param {express.Request} req
 * @param {express.Response} res
 * @description Calls the dao to delete the todo based on the provided id in params
 */
export const deleteTodoById = async (req, res, next) => {
  const id = req?.params?.id;
  try {
    if (id) {
      const deleteHandler = await removeTodoById(id);
      if (deleteHandler.status == 200) {
        res
          .status(statusCodes.success)
          .json({ message: 'Deleted Successfully' });
      } else
        res
          .status(statusCodes.notFound)
          .json({ message: 'Cannot Delete Todo That Does Not Exist' });
    } else
      res
        .status(statusCodes.badRequest)
        .json({ message: 'Id Field Cannot Be Empty ' });
  } catch (error) {
    next(error);
  }
};
