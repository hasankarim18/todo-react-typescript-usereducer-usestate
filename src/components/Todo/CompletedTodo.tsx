import { useContext, useEffect, useState } from "react";
import { typeConstants } from "../constants/constants";
import { TodoContext } from "../contexts/TodoContext/TodoContextProvider";
import { TTodo } from "../types/totoTypes";
import { deleteTodo } from "../utils/lib";

const CompletedTodo = () => {
  const { todoState, todoDispatch } = useContext(TodoContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  useEffect(() => {
    const debounceHandler = setTimeout(() => {
      setDebounceQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(debounceHandler);
    };
  }, [searchQuery]);

  const inCompleteAllHandler = () => {
    todoDispatch({ type: typeConstants.INCOMPLETE_ALL });
  };

  const taskCompletionToggle = (id: string) => {
    //  console.log(id);
    todoDispatch({ type: typeConstants.TASK_COMPLETTION_TOGGLE, payload: id });
  };

  const deleteTodoHandler = (id: string) => {
    deleteTodo(id, todoDispatch);
  };

  const completedTodo = todoState.filter(
    (todo) =>
      todo.isCompleted &&
      todo.title.toLowerCase().includes(debounceQuery.toLowerCase())
  );

  // if (completedTodo.length === 0) {
  //   return (
  //     <div className="col-span-12 border border-purple-400 p-4 rounded-lg">
  //       <h3 className="text-xl font-semibold text-purple-400">
  //         No. of completed task: {completedTodo.length}{" "}
  //       </h3>
  //     </div>
  //   );
  // }

  return (
    <div className="col-span-12 border border-purple-400 p-4 rounded-lg">
      <div className="flex justify-end mb-2">
        <button
          onClick={() => {
            inCompleteAllHandler();
          }}
          className="badge badge-warning"
        >
          Make all incomplete{" "}
        </button>
      </div>
      <div className="text-xl font-semibold  flex justify-between border-b-2 pb-2 mb-2">
        <div className="">
          <span className="underline"> No. of Completed Tasks: </span>
          <span>{completedTodo.length}</span>
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="">search by title:</label>
          <input
            className="input input-bordered"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
          />
        </div>
      </div>
      <ul>
        {completedTodo.map((todo: TTodo, i) => {
          if (todo.isCompleted) {
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
                    className={`badge badge-primary `}
                  >
                    Mark as incomplete
                  </button>
                  <button
                    onClick={() => {
                      deleteTodoHandler(todo.id);
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

export default CompletedTodo;
