import { createContext, useReducer } from "react";
import { typeConstants } from "../../constants/constants";
import { TodoProviderProps, TTodo } from "../../types/totoTypes";

type AddAction = {
  type: typeof typeConstants.ADD_TODO;
  payload: TTodo;
};

type ToggleTaskCompletion = {
  type: typeof typeConstants.TASK_COMPLETTION_TOGGLE;
  payload: string;
};

type TAction = AddAction | ToggleTaskCompletion;

type TDefaultValue = {
  todoState: TTodo[];
  todoDispatch: React.Dispatch<TAction>;
};

const defaultValue: TDefaultValue = {
  todoState: [],
  todoDispatch: () => {},
};

export const TodoContext = createContext<TDefaultValue>(defaultValue);

const todoReducer = (state: TTodo[], action: TAction): TTodo[] => {
  switch (action.type) {
    case typeConstants.ADD_TODO:
      if (typeof action.payload !== "string") {
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
      return state;

    default:
      return state;
  }
};

const TodoContextProvider = ({ children }: TodoProviderProps) => {
  const initialState: TTodo[] = [];

  const [todoState, todoDispatch] = useReducer(todoReducer, initialState);
  const values = {
    todoState,
    todoDispatch,
  };

  return <TodoContext.Provider value={values}>{children}</TodoContext.Provider>;
};

export default TodoContextProvider;
