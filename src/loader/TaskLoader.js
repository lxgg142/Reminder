import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

export default function TaskLoader() {
  const { tasks, setStoreTasks } = useContext(TaskContext);

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    storeData(tasks);
  }, [tasks]);

  const storeData = async (value) => {
    try {
      await AsyncStorage.setItem("tasks", JSON.stringify(value));
    } catch (error) {
      console.log(error);
    }
  };

  const getData = async () => {
    try {
      const tasks = await AsyncStorage.getItem("tasks");
      if (tasks != null) {
        setStoreTasks(JSON.parse(tasks));
      }
    } catch (error) {
      console.log(error);
    }
  };
}
