import { useState, useEffect } from "react";
import "./App.css";
const App = () => {
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState("");

  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  const LOCAL_STORAGE_KEY = "todos";

  // Get item on local storage
  useEffect(() => {
    const json = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (json) setTodos(json);
  }, []);

  // Set item local storage
  useEffect(() => {
    if (todos.length) {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  // Add the handlesubmit code here
  const handleSubmit = (e) => {
    e.preventDefault();

    const newTodo = {
      id: new Date().getTime(),
      text: todo.trim(),
      completed: false,
    };
    if (newTodo.text.length > 0) {
      setTodos([...todos].concat(newTodo));
      setTodo("");
    } else {
      alert("Enter Valid Task Please");
    }
  };

  // Add the deleteToDo code here
  const deleteTask = (id) => {
    let updateTask = [...todos].filter((todo) => todo.id !== id);
    setTodos(updateTask);
  };

  // Add the toggleComplete code here
  const toggleComplete = (id) => {
    let updateTask = [...todos].map((todo) => {
      if (todo.id === id) todo.completed = !todo.completed;

      return todo;
    });
    setTodos(updateTask);
    setTodoEditing(null);
  };

  // Add the submitEdits code here
  const submitEdits = (id) => {
    const updateTask = [...todos].map((todo) => {
      if (todo.id === id) {
        todo.text = editingText;
      }
      return todo;
    });
    setTodos(updateTask);
    setTodoEditing(null);
  };

  return (
    <div className='App'>
      <h1>Todo List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          align='right'
          placeholder='add new task'
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button type='submit'>Add Todo</button>
      </form>
      {todos.map((todo) => (
        <div
          className='todo'
          key={todo.id}>
          <div className='todo-text'>
            <input
              type='checkbox'
              id='completed'
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <input
                type='text'
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <div>{todo.text}</div>
            )}
          </div>
          <div className='todo-action'>
            {todo.id === todoEditing ? (
              <button onClick={() => submitEdits(todo.id)}>Submit Edits</button>
            ) : (
              <button onClick={() => setTodoEditing(todo.id)}>Edit</button>
            )}
          </div>

          <button onClick={() => deleteTask(todo.id)}>Delete Task</button>
        </div>
      ))}
    </div>
  );
};
export default App;
