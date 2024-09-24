import todos from './todo.json' assert { type: 'json' };

/**
 * @name showAllTodo
 * @returns {object} todos
 * @description
 */
export const showAllTodo = () => {
  return todos;
};
/**
 * @name showTodoById
 * @param {number | string} id
 * @returns {status:number}
 * @description
 */
export const showTodoById = (id) => {
  const todo = todos.find((todo) => todo.id === parseInt(id));
  if (todo) return { todo, status: 200 };
  return { status: 400 };
};

/**
 * @name createTodo
 * @param {object} body
 * @description
 */
export const createTodo = (body) => {
  todos.push({ id: Date.now(), ...body });
};

/**
 * @name editTodoById
 * @param {number | string} id
 * @param {object} updateValue
 * @returns {status:number}
 * @description
 */
export const editTodoById = (id, updateValue) => {
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex >= 0) {
    todos[todoIndex] = { id: parseInt(id), ...updateValue };
    return { status: 200 };
  }
  return { status: 404 };
};

/**
 * @name patchTodobyId
 * @param {number | string} id
 * @param {object} patchValue
 * @returns {status:number}
 * @description
 */
export const patchTodobyId = (id, patchValue) => {
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex >= 0) {
    todos[todoIndex] = { ...todos[todoIndex], ...patchValue };
    return { status: 200 };
  }
  return { status: 404 };
};

/**
 * @name removeTodoById
 * @param {number | string} id
 * @returns {status:number}
 * @description
 */
export const removeTodoById = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === parseInt(id));
  if (todoIndex >= 0) {
    todos.splice(todoIndex, 1);
    return { status: 200 };
  }
  return { status: 404 };
};
