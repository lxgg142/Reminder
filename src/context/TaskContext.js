import React, { createContext, useState } from "react";
import TaskLoader from "./loader/TaskLoader";
import { COLORS } from "../color";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const priority = COLORS.priority;
  const [tasks, setTasks] = useState([]);
  const [priorityState, setPriorityState] = useState(priority.default);

  const changePriorityState = (value) => {
    setPriorityState(value);
  };

  const setStoreTasks = (value) => {
    setTasks(value);
  };

  TaskLoader({ tasks, setStoreTasks });

  const addTask = (value) => {
    if (value == null) return;

    const task = {
      id: Math.random(),
      label: value,
      completed: false,
      priority: priorityState,
    };
    setTasks([...tasks, task]);
    setPriorityState(priority.default);
  };

  const changePriority = (key, taskID) => {
    const task = tasks.map((item) => {
      if (item.id == taskID) {
        return { ...item, priority: key };
      }
      return item;
    });
    setTasks(task);
  };

  const changeLabel = (value, taskID) => {
    const task = tasks.map((item) => {
      if (item.id == taskID) {
        return { ...item, label: value };
      }
      return item;
    });
    setTasks(task);
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
        changePriority,
        changeLabel,
        tasks: tasks,
        priorityState: priorityState,
        changePriorityState,
        setStoreTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
