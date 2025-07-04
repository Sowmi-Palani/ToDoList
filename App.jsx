import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import TaskList from './pages/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const storedTasks = localStorage.getItem('taskList');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddOrUpdate = () => {
    if (!title.trim() || !desc.trim()) return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = { title, desc };
      setTasks(updated);
      setEditIndex(null);
    } else {
      setTasks([...tasks, { title, desc }]);
    }

    setTitle('');
    setDesc('');
  };

  const handleEdit = (index) => {
    setTitle(tasks[index].title);
    setDesc(tasks[index].desc);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
    if (editIndex === index) {
      setEditIndex(null);
      setTitle('');
      setDesc('');
    }
  };

  return (
    <div className="app">
      <h2>{editIndex !== null ? 'Edit Task' : 'Add New Task📋'}</h2>
      <div className="input-group">
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={handleAddOrUpdate}>
          {editIndex !== null ? 'Update' : 'Add Task ➕'}
        </button>
      </div>

      <h3>Tasks</h3>
      <ul className="task-list">
        {tasks.length === 0 ? (
          <p>No tasks available</p>
        ) : (
          tasks.map((task, index) => (
            <li key={index} className="task-item">
              <strong>{task.title}</strong>
              <p>{task.desc}</p>
              <button onClick={() => handleEdit(index)}>Edit ✏️ </button>
              <button class="dlt" onClick={() => handleDelete(index)}>Delete 🗑️ </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default App;