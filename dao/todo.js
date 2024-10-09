import { Todo } from '../model/todoModel.js';

/**
 * @name showAllTodo
 * @returns {object} todos
 * @description
 */
export const showAllTodo = async () => {
  const data = await Todo.find();
  throw new Error('Got hit by an error');
  return data;
};
/**
 * @name showTodoById
 * @param {number | string} id
 * @returns {status:number}
 * @description
 */
export const showTodoById = async (id) => {
  const todo = await Todo.findById(id);
  if (todo) return { todo, status: 200 };
  return { status: 400 };
};

/**
 * @name createTodo
 * @param {object} body
 * @description
 */
export const createTodo = async (body) => {
  await Todo.insertMany({ ...body });
  return;
};

/**
 * @name editTodoById
 * @param {number | string} id
 * @param {object} updateValue
 * @returns {status:number}
 * @description
 */
export const editTodoById = (id, updateValue) => {};

/**
 * @name patchTodobyId
 * @param {number | string} id
 * @param {object} patchValue
 * @returns {status:number}
 * @description
 */
export const patchTodobyId = async (id, patchValue) => {
  let query = { $set: {} };
  let data = await Todo.findById(id);
  if (data) {
    for (let key in patchValue) {
      if (data[key] !== patchValue[key]) {
        query.$set[key] = patchValue[key];
      }
    }
    await Todo.updateOne({ _id: id }, query);
    return { status: 200 };
  } else return { status: 404 };
};

/**
 * @name removeTodoById
 * @param {number | string} id
 * @returns {status:number}
 * @description
 */
export const removeTodoById = async (id) => {
  const removedData = await Todo.deleteOne({ _id: id });
  if (removedData) return { status: 200 };
  return { status: 404 };
};
