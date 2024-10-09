import mongoose, { Schema } from 'mongoose';

const todoSchema = new Schema({
  todoId: String,
  todoTitle: String,
  category: String,
  due: String,
  sectionId: String,
  sectionName: String,
  isImportant: Boolean,
  isCompleted: Boolean,
  notes: String,
  // subtasks: [{ name: String, isCompleted: Boolean }],
});

export const Todo = mongoose.model('Todo', todoSchema);
