import React, { createContext, useState } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const prioritys = {
    low: "low",
    medium: "medium",
    high: "high",
    default: "default",
  };

  const item = {
    id: 1,
    label: "test",
    completed: true,
    priority: prioritys.low,
  };

  const [tasks, setTasks] = useState([item]);
  const [priorityState, setPriorityState] = useState(prioritys.default);

  const changePriorityState = (value) => {
    setPriorityState(value);
  };

  const addTask = (value) => {
    if (value == null) return;

    const task = {
      id: Math.random(),
      label: value,
      completed: false,
      priority: priorityState,
    };
    setTasks([...tasks, task]);
    setPriorityState(prioritys.default);
  };

  const markTask = (taskID) => {
    const task = tasks.map((item) => {
      if (item.id == taskID) {
        return { ...item, completed: true };
      }
      return item;
    });
    setTasks(task);
  };

  const unMarkTask = (taskID) => {
    const task = tasks.map((item) => {
      if (item.id == taskID) {
        return { ...item, completed: false };
      }
      return item;
    });
    setTasks(task);
  };

  const deleteTask = (taskID) => {
    const newTasks = tasks.filter((item) => item.id != taskID);
    setTasks(newTasks);
  };

  const clearAllTasks = () => {
    if (tasks != "") {
      Alert.alert("Confirm", "Clear tasks?", [
        {
          text: "Yes",
          onPress: () => setTasks([]),
        },
        {
          text: "No",
        },
      ]);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        addTask,
        markTask,
        unMarkTask,
        deleteTask,
        clearAllTasks,
        prioritys,
        tasks: tasks,
        priorityState: priorityState,
        changePriorityState,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
