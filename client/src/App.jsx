import { FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  /* Get Request and getting todos from the Server. */
  const [fetch, setFetch] = useState([]);
  const [key, setKey] = useState("");
  useEffect(() => {
    async function getData() {
      const response = await axios.get("http://localhost:8080/routes");
      setFetch(response.data);
    }
    getData();
  }, []);

  /* Delete Request to delete the todos form the Database */
  async function deleteTodo(id) {
    try {
      await axios.delete("http://localhost:8080/routes/delete/" + id);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  }

  /* Post Request to Add todos in the Database */
  async function addTodo() {
    try {
      await axios.post("http://localhost:8080/routes/add", {
        todo: todo,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const [todo, setTodo] = useState("");
  const [update, setUpdate] = useState("");

  function crossLine(e) {
    if (e.target.style.textDecoration) {
      e.target.style.removeProperty("text-decoration");
    } else {
      e.target.style.setProperty("text-decoration", "line-through");
    }
  }

  function handleSubmit(e) {
    e.preventDefaultValue();
  }

  return (
    <div className="h-screen w-full flex justify-center items-center bg-background">
      <form
        className="border border-black bg-form p-4 rounded-sm"
        onSubmit={handleSubmit}
      >
        <h3 className="text-center text-2xl p-1 mb-4 text-white">
          Get Things Done!
        </h3>
        <input
          type="text"
          placeholder="What is the Task today?"
          className="p-2 ml-2 mb-6 rounded-l-sm bg-form border border-background outline-none text-white"
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className="bg-background p-2 mr-1 rounded-r-sm border border-background"
          onClick={addTodo}
        >
          Add Task
        </button>

        {fetch.map((i, k) => {
          return (
            <div
              key={k}
              className="flex justify-between items-center bg-background p-2 m-2 rounded-sm text-white"
            >
              <span className="text-white cursor-pointer" onClick={crossLine}>
                {i.todo}
              </span>
              <span className="flex items-center ">
                <FaTrash
                  className="mx-2 cursor-pointer"
                  onClick={(e) => deleteTodo(i._id)}
                />
              </span>
            </div>
          );
        })}
      </form>
    </div>
  );
}

export default App;
