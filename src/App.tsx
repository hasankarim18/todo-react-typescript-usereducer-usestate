import "./App.css";
import Todo from "./components/Todo/Todo";

function App() {
  return (
    <>
      <div className="max-w-7xl mx-auto ">
        <div className="mx-0 md:mx-4">
          <h1 className="text-4xl text-center">
            Todo TypeScript useReducer Context Api
          </h1>
          <div className="mt-6">
            <Todo />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
