import { typeConstants } from "../constants/constants";
import { TAction } from "../types/totoTypes";

export const deleteTodo = (
  id: string,
  todoDispatch: React.Dispatch<TAction>
) => {
  todoDispatch({ type: typeConstants.DELETE_TODO, payload: id });
};
