import React from "react";

export default function Head({ tasks }) {
  const taskCompleted = tasks.filter((e)=>e.taskCompleted ===true);
  if (tasks.length > 0) {
    return (
      <div className="head">
        <p> Total Tasks: {tasks.length}</p> <p>Completed Tasks: {taskCompleted.length}</p>
      </div>
    );
  } else {
    return <span></span>;
  }
}
