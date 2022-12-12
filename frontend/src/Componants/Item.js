import React from "react";

export default function Item({ task, updateTask, deleteTask, doneTask }) {
  
  return (
    <>
      {" "}
      <p className={task.taskCompleted ? "completed text-task" : "text-task"}>
        {task.body}
      </p>
      <div className="btns">
        <span className="done" onClick={doneTask}>
          Done
        </span>
        <span
          className="edit"
          onClick={() => {
            document.querySelector(".input").focus();
            updateTask();
          }}
        >
          Edit
        </span>
        <span onClick={deleteTask}>Delete</span>
      </div>
    </>
  );
}
