import { ReactNode } from "react";
import { typeConstants } from "../constants/constants";

export type TodoProviderProps = {
  children: ReactNode;
};

export type TTodo = {
  id: string;
  title: string;
  isCompleted: boolean;
};

export type AddAction = {
  type: typeof typeConstants.ADD_TODO;
  payload: TTodo;
};

export type ToggleTaskCompletion = {
  type: typeof typeConstants.TASK_COMPLETTION_TOGGLE;
  payload: string;
};

export type CompleteAllTodo = {
  type: typeof typeConstants.COMPLETE_ALL;
  payload?: string;
};

export type TAction = AddAction | ToggleTaskCompletion | CompleteAllTodo;

export type TDefaultValue = {
  todoState: TTodo[];
  todoDispatch: React.Dispatch<TAction>;
};
