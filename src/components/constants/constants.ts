import { TTodo } from "../types/totoTypes";

export const typeConstants = {
  ADD_TODO: "addTodo",
  TASK_COMPLETTION_TOGGLE: "taskCompletionToggle",
  DELETE_TODO: "deleteTodo",
  COMPLETE_ALL: "completeAllTodo",
  INCOMPLETE_ALL: "incompleteAll",
  DELETE_ALL: "deleteAll",
};

export const initialState: TTodo[] = [
  {
    id: "1",
    title: "Buy groceries",
    isCompleted: false,
  },
  {
    id: "2",
    title: "Clean the house",
    isCompleted: true,
  },
  {
    id: "3",
    title: "Finish project report",
    isCompleted: false,
  },
  {
    id: "4",
    title: "Call mom",
    isCompleted: true,
  },
  {
    id: "5",
    title: "Schedule doctor appointment",
    isCompleted: false,
  },
];
