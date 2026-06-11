import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../api";
import "./Dashboard.css";

function Dashboard() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;

    try {
      await axios.post("/tasks", {
        title,
        status: "Pending",
        priority: "Medium",
      });

      setTitle("");
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const toggleStatus = async (task) => {
    try {
      await axios.put(`/tasks/${task.id}`, {
        status:
          task.status === "Pending"
            ? "Completed"
            : "Pending",
      });

      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  return (
    <div className="dashboard-container">

      <button
        className="logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>

      <div className="dashboard-header">
        <h1 className="dashboard-title">
          Smart Task Dashboard
        </h1>

        <p className="dashboard-subtitle">
          Organize • Track • Complete
        </p>
      </div>

      <div className="stats-container">
        <div className="stat-card">
          <h2>{tasks.length}</h2>
          <p>Total Tasks</p>
        </div>

        <div className="stat-card">
          <h2>{completedTasks}</h2>
          <p>Completed</p>
        </div>

        <div className="stat-card">
          <h2>{pendingTasks}</h2>
          <p>Pending</p>
        </div>
      </div>

      <div className="task-form">
        <input
          type="text"
          placeholder="Enter new task..."
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          className="task-input"
        />

        <button
          onClick={addTask}
          className="add-btn"
        >
          Add Task
        </button>
      </div>

      {tasks.length === 0 ? (
        <p className="empty-task">
          No tasks available
        </p>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="task-card"
            >
              <h3>{task.title}</h3>

              <span
                className={`task-status ${
                  task.status === "Completed"
                    ? "completed"
                    : "pending"
                }`}
              >
                {task.status}
              </span>

              <div className="task-actions">

                <button
                  className="complete-btn"
                  onClick={() =>
                    toggleStatus(task)
                  }
                >
                  {task.status === "Completed"
                    ? "Mark Pending"
                    : "Mark Complete"}
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTask(task.id)
                  }
                >
                  Delete
                </button>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;