import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import Header from './Header';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/tasks${status ? `?status=${status}` : ''}`);
      setTasks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilter = async (selectedStatus) => {
    setStatus(selectedStatus);
  };

  return (
    <div className="container">
        <Header/>
        <br></br>
      <h2 className="my-4">Task List</h2>

      <div className="btn-group mb-4">
        <button
          className={`btn btn-outline-primary ${status === '' ? 'active' : ''}`}
          onClick={() => handleFilter('')}
        >
          All
        </button>
        <button
          className={`btn btn-outline-primary ${status === 'pending' ? 'active' : ''}`}
          onClick={() => handleFilter('pending')}
        >
          Pending
        </button>
        <button
          className={`btn btn-outline-primary ${status === 'completed' ? 'active' : ''}`}
          onClick={() => handleFilter('completed')}
        >
          Completed
        </button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>{status === '' || status === task.status ? task.title : null}</td>
              <td>{status === '' || status === task.status ? task.status : null}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TaskList;
