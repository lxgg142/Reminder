import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Pressable,
} from "react-native";

import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TaskContext } from "../context/TaskContext";
import { ThemeContext } from "../context/ThemeContext";
import TaskItem from "../components/TaskItem";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";

export default function MainScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { tasks, deleteTask, markTask, unMarkTask, setStoreTasks } =
    useContext(TaskContext);

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

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        {...(Platform.OS === "ios" ? { behavior: "padding" } : {})}
      >
        {/**header */}
        <Header>
          <Pressable onPress={() => navigation.push("info")}>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}
            >
              Simple Todo
            </Text>
          </Pressable>
          <TouchableOpacity onPress={() => navigation.push("task")}>
            <MaterialIcons name="add" size={24} color={theme.text} />
          </TouchableOpacity>
        </Header>
        {/**content */}
        <FlatList
          data={tasks}
          ItemSeparatorComponent={() => {
            return <View style={{ backgroundColor: theme.sep, height: 1 }} />;
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }, index) => {
            return (
              <TaskItem
                index={index + 1}
                task={item}
                deleteTask={() => deleteTask(item.id)}
                markTask={() => {
                  if (item.completed == false) {
                    markTask(item.id);
                  } else {
                    unMarkTask(item.id);
                  }
                }}
              />
            );
          }}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
