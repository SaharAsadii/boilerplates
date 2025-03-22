import { useState } from "react";
import useTaskStoreHook from "./store";

function App() {
  const { tasks, addTask, removeTask, updateTask } = useTaskStoreHook();
  const [text, setText] = useState<string>("");

  const handleAdd = () => {
    if (!text.trim()) return;
    addTask({ id: Date.now(), text });
    setText("");
  };

  return (
    <div>
      <h1>Task List</h1>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Add a task"
      />
      <button onClick={handleAdd}>Add</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              value={task.text}
              onChange={(e) => updateTask(task.id, e.target.value)}
            />
            <button onClick={() => removeTask(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
