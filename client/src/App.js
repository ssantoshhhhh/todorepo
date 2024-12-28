import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [item, setItem] = useState([]);
  const [newTask, setNewtask] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/gettasks').then((arr) => setItem(arr.data));
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/addtask', { todo: newTask }).then((arr) => setItem(arr.data));
    setNewtask('');
  };

  const deleteHandler = (id) => {
    axios.delete(`http://localhost:5000/delete/${id}`).then((arr) => setItem(arr.data));
  };

  return (
    <div className="app-container">
      <header className="navbar">
        <h1>To-Do List</h1>
        <p>Stay productive and organized</p>
      </header>

      <main>
        <section className="welcome-section">
          <h2>Welcome to Your Task Manager</h2>
          <p>Easily track and manage your daily tasks.</p>
        </section>

        <section className="task-section">
          <form onSubmit={submitHandler} className="input-group">
            <input
              type="text"
              className="task-input"
              value={newTask}
              onChange={(e) => setNewtask(e.target.value)}
              placeholder="Enter new task"
            />
            <button type="submit" className="add-button">Add</button>
          </form>

          <ul className="task-list">
            {item.map((task) => (
              <li className="task-item" key={task._id}>
                {task.todo}
                <button onClick={() => deleteHandler(task._id)} className="delete-button">X</button>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <p>&copy; 2024 To-Do List</p>
          <p>Built with simplicity and productivity in mind.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
