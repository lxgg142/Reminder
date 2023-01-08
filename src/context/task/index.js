import React, { createContext, useState } from "react";
import TaskLoader from "../loader/TaskLoader";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const setStoreTasks = (value) => {
    setTasks(value);
  };

  TaskLoader({ tasks, setStoreTasks });

  const getTask = (id) => {
    return tasks.find((item) => item.id == id);
  };

  const addTask = (value, description, priority, date) => {
    if (value == null) return;

    const task = {
      id: Math.random(),
      label: value,
      completed: false,
      priority: priority,
      description: description,
      date: date,
    };
    setTasks([...tasks, task]);
  };

  const changePriority = (color, taskID) => {
    const task = tasks.map((item) => {
      if (item.id == taskID) {
        return { ...item, priority: color };
      }
      return item;
    });
    setTasks(task);
  };

  const changeDescription = (description, taskID) => {
    const task = tasks.map((item) => {
      if (item.id == taskID) {
        return { ...item, description: description };
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
        getTask,
        changeDescription,
        tasks: tasks,
        setStoreTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
