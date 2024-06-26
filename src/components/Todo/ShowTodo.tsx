import { useContext } from "react";
import { typeConstants } from "../constants/constants";
import { TodoContext } from "../contexts/TodoContext/TodoContextProvider";
import { TTodo } from "../types/totoTypes";

const ShowTodo = () => {
  const { todoState, todoDispatch } = useContext(TodoContext);

  const taskCompletionToggle = (id: string) => {
    //  console.log(id);
    todoDispatch({ type: typeConstants.TASK_COMPLETTION_TOGGLE, payload: id });
  };

  if (todoState.length === 0) {
    return (
      <div className="col-span-8 border border-purple-400 p-4 rounded-lg">
        <h3 className="text-xl font-semibold text-purple-400">
          {" "}
          Add todo to show todo list{" "}
        </h3>
      </div>
    );
  }

  return (
    <div className="col-span-8">
      <ul>
        {todoState.map((todo: TTodo, i) => {
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
                  <button className="badge badge-error ms-4">delete</button>
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
