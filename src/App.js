import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

const App = () => {
  const LOCAL_STORAGE_KEY = "todos";

  const [todos, setTodos] = useState(() => {
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
  });
  const [todo, setTodo] = useState("");

  const [todoEditing, setTodoEditing] = useState(null);
  const [editingText, setEditingText] = useState("");

  // Set item local storage
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos));
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
      setTodos((prevArray) => [...prevArray, newTodo]);
      setTodo("");
    } else {
      alert("Enter Valid Task Please");
    }
  };

  // Add the deleteToDo code here
  const deleteTask = (id, isCompleted) => {
    let updateTask = [...todos].filter((todo) => todo.id !== id);
    if (isCompleted) {
      setTodos(updateTask);
    } else {
      alert("Please Complete Your Task First");
    }
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
    <div className='container-md w-75'>
      <h1 className='text-center mb-4'>Todo List</h1>
      <Form
        onSubmit={handleSubmit}
        className='d-flex flex-column gap-3 mb-5 bg-white shadow p-4 rounded'>
        <Form.Group>
          <Form.Label>Add Task</Form.Label>
          <Form.Control
            type='text'
            placeholder='write your new task here'
            value={todo}
            onChange={(e) => setTodo(e.target.value)}
          />
        </Form.Group>

        <Button
          variant='success'
          type='submit'>
          Add Todo
        </Button>
      </Form>
      {todos.map((todo) => (
        <div
          className='d-flex flex-wrap justify-content-between gap-3 mb-4 shadow p-4 rounded'
          key={todo.id}>
          <div className='d-flex gap-3'>
            <input
              type='checkbox'
              id='completed'
              checked={todo.completed}
              onChange={() => toggleComplete(todo.id)}
            />
            {todo.id === todoEditing ? (
              <Form.Control
                type='text'
                onChange={(e) => setEditingText(e.target.value)}
              />
            ) : (
              <h5
                style={{ textTransform: "capitalize" }}
                className='pt-2'>
                {todo.text}
              </h5>
            )}
          </div>
          <div className='d-flex gap-3'>
            <div className='todo-action'>
              {todo.id === todoEditing ? (
                <Button
                  variant='primary'
                  onClick={() => submitEdits(todo.id)}>
                  Submit Edits
                </Button>
              ) : (
                <Button
                  variant='primary'
                  onClick={() => setTodoEditing(todo.id)}>
                  Edit
                </Button>
              )}
            </div>

            <Button
              variant='danger'
              onClick={() => deleteTask(todo.id, todo.completed)}>
              Delete Task
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};
export default App;
