import { useContext, useEffect, useState } from "react";
import { typeConstants } from "../constants/constants";
import { TodoContext } from "../contexts/TodoContext/TodoContextProvider";
import { TTodo } from "../types/totoTypes";
import { deleteTodo } from "../utils/lib";

const ShowTodo = () => {
  const { todoState, todoDispatch } = useContext(TodoContext);
  const [searchQuery, setSearchQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebounceQuery(searchQuery);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  const taskCompletionToggle = (id: string) => {
    //  console.log(id);
    todoDispatch({ type: typeConstants.TASK_COMPLETTION_TOGGLE, payload: id });
  };

  const incompleteTodos = todoState.filter((todo) => !todo.isCompleted);

  const filteredTodos = todoState.filter(
    (todo) =>
      !todo.isCompleted &&
      todo.title.toLowerCase().includes(debounceQuery.toLocaleLowerCase())
  );

  return (
    <div className="col-span-8 border border-purple-400 p-4 rounded-lg">
      <div className="text-xl font-semibold flex items-center gap-4 justify-between  mb-2">
        <div>
          <span className="underline"> No. of Tasks yet to be done: </span>
          <span>{filteredTodos.length}</span>
        </div>
        <div className="flex gap-2 items-center">
          <label htmlFor="">Search:</label>
          <input
            className="input input-bordered"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <ul>
        {(() => {
          if (todoState.length === 0) {
            return (
              <div className="text-xl text-success">
                No pending task - Add todo
              </div>
            );
          }
          if (incompleteTodos.length === 0) {
            return <div className="text-xl text-success">No pending task</div>;
          }

          if (filteredTodos.length === 0) {
            return <div className="text-xl text-warning">No search found</div>;
          }

          return (
            <>
              {filteredTodos.map((todo: TTodo, i) => {
                if (!todo.isCompleted) {
                  return (
                    <li
                      key={i}
                      className="mb-4 text-xl font-semibold flex justify-between"
                    >
                      <span
                        className={`${todo.isCompleted ? "line-through" : ""}`}
                      >
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
            </>
          );
        })()}
      </ul>
    </div>
  );
};

export default ShowTodo;
