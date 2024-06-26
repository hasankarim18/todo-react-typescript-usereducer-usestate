import { useContext, useState } from "react";
import { typeConstants } from "../constants/constants";
import { TodoContext } from "../contexts/TodoContext/TodoContextProvider";

const AddTodo = () => {
  const { todoDispatch } = useContext(TodoContext);
  const [title, setTitle] = useState("");

  const changeHandler = (e) => {
    setTitle(e.target.value);
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const todo = {
      id: Math.random().toString(36).substring(2, 7),
      title: title,
      isCompleted: false,
    };

    todoDispatch({ type: typeConstants.ADD_TODO, payload: todo });
    setTitle("");
  };

  return (
    <div className="col-span-4 border border-purple-400 p-4 rounded-lg">
      <div>
        <form onSubmit={submitHandler} action="">
          <div className="flex items-center">
            <label className="mr-2">Add todo</label>
            <input
              name="title"
              type="text"
              onChange={changeHandler}
              className="input flex-grow  input-bordered"
              value={title}
            />
          </div>
          <div className="flex justify-end">
            <input
              type="submit"
              value="Submit"
              className="btn btn-success mt-4"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTodo;
