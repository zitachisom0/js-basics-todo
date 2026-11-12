const { useState, useEffect } = React;

function App() {
  const [text, setText] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);
  const [editText, setEditText] = useState("");
  const [filter, setFilter] = useState("all");
  const remainingTasks = tasks.filter((task) => !task.done).length;
  const addTask = () => {
    setTasks([...tasks, {id:Date.now(), text, done:false}]);
    setText("");
  }
  // loads saved tasks when the app starts
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }   
  }, []);
  
  // saves tasks every time the tasks state changes
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const deleteTask = (idToDelete) => {
    setTasks(tasks.filter((task) => task.id !== idToDelete));
  }
  const toggleDone = (idToToggle) => {
    setTasks(
      tasks.map((task) => 
        task.id === idToToggle ? { ...task, done: !task.done } : task
      )
    );
  }
  const startEditing = (id) => {
    setEditingIndex(id);
    setEditText(tasks.find((task) => task.id === id).text);
  }
  const saveEdit = (idToSave) => {
    setTasks(
      tasks.map((task) => 
        task.id === idToSave ? { ...task, text: editText } : task
      )
    );
    setEditingIndex(null);
    setEditText("");
  }
  const cancelEdit = () => {
    setEditingIndex(null);
    setEditText("");
  }
  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.done;
    if (filter === "pending") return !task.done;
    return true;
  })
  return (
    <div>
      <h1>My To-Do List</h1>
      <p className="count">Remaining tasks: {remainingTasks}</p>
      <input  
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") addTask();
        }}

        />
      <button onClick={addTask}>Add Text</button>

        <button onClick={() => setFilter("all")}>
          All
        </button>
        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
        <button onClick={() => setFilter("pending")}>
          Pending 
        </button>


        {filteredTasks.map((task) => (
          <div key={task.id} className="taskRow">

            {/* checkBox */}
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
              />

            {/* task */}
            {editingIndex === task.id ? (
              <>
                <input value={editText} onChange={(e) => setEditText(e.target.value)} />
                <button onClick={() => saveEdit(task.id)}>Save</button>
                <button onClick={cancelEdit}>Cancel</button>
              </>
            ):(
              <>
              <p className={task.done ? "task done" : "task"}>{task.text}</p>
              <button onClick={() => startEditing(task.id)}>Edit</button>
              </>
            )}
            <button className="deleteButton" onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </div>
          ))}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
