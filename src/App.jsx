import React, { useState, useEffect } from "react";

import { Container } from "@material-ui/core";
import TodoList from "./components/TodoList";
import TodoForm from "./components/TodoForm";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  const handleAddTask = (newTask) => {
    setTasks((prevTasks) => [
      ...prevTasks,
      { id: uuidv4(), ...newTask },
    ]);
  };

  const handleEditTask = (updatedTask) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))
    );
  };

  const handleDeleteTask = (taskToDelete) => {
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.id !== taskToDelete.id)
    );
  };

  const handleCompleteTask = (taskToComplete) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskToComplete.id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  return (
    <Container maxWidth="sm" style={{"textAlign": "center", "alignItems":"center"}}>
      <TodoForm onSubmit={handleAddTask} />
      <TodoList
        tasks={tasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onComplete={handleCompleteTask}
      />
    </Container>
  );
}

export default App;
