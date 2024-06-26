import { createContext, useReducer } from "react";
import { initialState, typeConstants } from "../../constants/constants";
import {
  TAction,
  TDefaultValue,
  TodoProviderProps,
  TTodo,
} from "../../types/totoTypes";

const defaultValue: TDefaultValue = {
  todoState: [],
  todoDispatch: () => {},
};

export const TodoContext = createContext<TDefaultValue>(defaultValue);

const todoReducer = (state: TTodo[], action: TAction): TTodo[] => {
  switch (action.type) {
    case typeConstants.ADD_TODO:
      if (
        typeof action.payload !== "string" &&
        typeof action.payload !== "undefined"
      ) {
        return [...state, action.payload];
      }
      return [...state];
    case typeConstants.TASK_COMPLETTION_TOGGLE:
      return state.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, isCompleted: !todo.isCompleted };
        } else {
          return todo;
        }
      });
    case typeConstants.DELETE_TODO:
      return state.filter((todo) => todo.id !== action.payload);
    case typeConstants.COMPLETE_ALL:
      return state.map((todo) => {
        return { ...todo, isCompleted: true };
      });
    case typeConstants.INCOMPLETE_ALL:
      return state.map((todo) => ({ ...todo, isCompleted: false }));
    default:
      return state;
  }
};

const TodoContextProvider = ({ children }: TodoProviderProps) => {
  const [todoState, todoDispatch] = useReducer(todoReducer, initialState);
  const values = {
    todoState,
    todoDispatch,
  };

  return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
