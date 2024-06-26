import { useContext } from "react";
import { typeConstants } from "../constants/constants";
import { TodoContext } from "../contexts/TodoContext/TodoContextProvider";
import { TTodo } from "../types/totoTypes";
import { deleteTodo } from "../utils/lib";

const ShowTodo = () => {
  const { todoState, todoDispatch } = useContext(TodoContext);

  const taskCompletionToggle = (id: string) => {
    //  console.log(id);
    todoDispatch({ type: typeConstants.TASK_COMPLETTION_TOGGLE, payload: id });
  };

  const incompleteTodo = todoState.filter((todo) => !todo.isCompleted);

  if (incompleteTodo.length === 0) {
    return (
      <div className="col-span-8 border border-purple-400 p-4 rounded-lg">
        <h3 className="text-xl font-semibold text-purple-400">
          No task available
        </h3>
      </div>
    );
  }

  return (
    <div className="col-span-8 border border-purple-400 p-4 rounded-lg">
      <h2 className="text-xl font-semibold  mb-2">
        <span className="underline"> No. of Tasks yet to be done: </span>
        <span>{incompleteTodo.length}</span>
      </h2>
      <ul>
        {incompleteTodo.map((todo: TTodo, i) => {
          if (!todo.isCompleted) {
            return (
              <li
                key={i}
                className="mb-4 text-xl font-semibold flex justify-between"
              >
                <span className={`${todo.isCompleted ? "line-through" : ""}`}>
                  {i + 1}. {todo.title}
                </span>
                <span>
                  <button
                    onClick={() => {
                      taskCompletionToggle(todo.id);
                    }}
                    className={`badge badge-success`}
                  >
                    Mark as complete
                  </button>
                  <button
                    onClick={() => {
                      deleteTodo(todo.id, todoDispatch);
                    }}
                    className="badge badge-error ms-4"
                  >
                    delete
                  </button>
                </span>
              </li>
            );
          } else {
            return "";
          }
        })}
      </ul>
    </div>
  );
};

export default ShowTodo;
