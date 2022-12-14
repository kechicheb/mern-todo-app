import React from "react";
import { useEffect, useState } from "react";
import NewTaskForm from "./NewTaskForm";
import Item from "./Item";
import Head from "./Head";
import axios from "axios";

export default function TaskList() {
  const [Text, setText] = useState("");
  const [Completed, setCompleted] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [isUpdating, setUpdating] = useState("");
  let [error, setError] = useState("");

  window.onload = () => document.querySelector(".input").focus();
  function fetchTasks() {
    axios
      .get("http://localhost:4000/api/tasks")
      .then((res) => {
        setTasks(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    fetchTasks();
  }, [tasks]);
  const addUpdateTask = () => {
    if (!Text) {
      setError("Please Enter Task");

      return;
    } else {
      if (isUpdating === "") {
        setError("");
        const task = {
          body: Text,
          taskCompleted: false,
        };

        axios
          .post("http://localhost:4000/api/tasks", task)
          .then((res) => console.log(res.data));

        setText("");
      } else {
        setError("");
        const task = {
          body: Text,
          taskCompleted: Completed,
        };

        axios
          .put(`http://localhost:4000/api/tasks/${isUpdating}`, task)
          .then((res) => console.log(res.data));
        setText("");
        setUpdating("");
        setCompleted(false);
      }
    }
    document.querySelector(".input").focus();
  };
  const updateTask = (id, text, taskCompleted) => {
    setUpdating(id);
    setText(text);
    setCompleted(taskCompleted);
  };
  const doneTask = (id, body) => {
    const task = {
      body: body,
      taskCompleted: true,
    };
    axios
      .put(`http://localhost:4000/api/tasks/${id}`, task)
      .then((res) => console.log(res.data));
  };

  function deleteTask(id) {
    axios
      .delete(`http://localhost:4000/api/tasks/${id}`)
      .then((res) => console.log(res.data));
    if (tasks.length) {
      setUpdating("");
      setText("");
    }
  }
  useEffect(() => {
    fetchTasks();
  }, [tasks]);
  const allTasks = tasks.map((task) => {
    return (
      <div className="task" key={task._id}>
        <Item
          task={task}
          doneTask={() => {
            doneTask(task._id, task.body);
          }}
          deleteTask={() => deleteTask(task._id)}
          updateTask={() => updateTask(task._id, task.body, task.taskCompleted)}
        />
      </div>
    );
  });

  return (
    <>
      <h1>Todo App</h1>
      <div className="container">
        <NewTaskForm
          Text={Text}
          setText={setText}
          addUpdateTask={addUpdateTask}
          isUpdating={isUpdating}
          tasks={tasks}
        />
        <div className="error">{error}</div>
        <Head tasks={tasks} />
        <div className="tasks">{allTasks}</div>
      </div>
    </>
  );
}
