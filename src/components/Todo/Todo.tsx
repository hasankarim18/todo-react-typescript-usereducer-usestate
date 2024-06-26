import TodoContextProvider from "../contexts/TodoContext/TodoContextProvider";
import AddTodo from "./AddTodo";
import CompletedTodo from "./CompletedTodo";
import ShowTodo from "./ShowTodo";

const Todo = () => {
  return (
    <div>
      <TodoContextProvider>
        <div>
          <div className="grid grid-cols-12 gap-8">
            <AddTodo />
            <ShowTodo />
            <CompletedTodo />
          </div>
        </div>
      </TodoContextProvider>
    </div>
  );
};

export default Todo;
