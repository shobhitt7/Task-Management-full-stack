import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskApp = () => {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchTasks = async () => {
    try {
      const res = await axios.get(`${API_URL}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error("Failed to fetch tasks:", err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addTask = async () => {
    if (!form.name.trim()) return;
    try {
      await axios.post(`${API_URL}/tasks`, form);
      setForm({ name: '', description: '' });
      fetchTasks();
    } catch (err) {
      console.error("Failed to add task:", err);
    }
  };

  const updateTask = async () => {
    try {
      await axios.put(`${API_URL}/tasks/${editId}`, form);
      setForm({ name: '', description: '' });
      setEditId(null);
      fetchTasks();
    } catch (err) {
      console.error("Failed to update task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error("Failed to delete task:", err);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "auto" }}>
      <h2>Task Management</h2>

      <input
        name="name"
        placeholder="Task Name"
        value={form.name}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 10 }}
      />
      <input
        name="description"
        placeholder="Task Description"
        value={form.description}
        onChange={handleChange}
        style={{ width: "100%", marginBottom: 10 }}
      />

      <button onClick={editId ? updateTask : addTask}>
        {editId ? "Update Task" : "Add Task"}
      </button>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map((task) => (
          <li key={task.id} style={{ marginTop: 15 }}>
            <strong>{task.name}</strong>: {task.description}
            <button
              onClick={() => {
                setEditId(task.id);
                setForm({ name: task.name, description: task.description });
              }}
              style={{ marginLeft: 10 }}
            >
              Edit
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: 5 }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskApp;
