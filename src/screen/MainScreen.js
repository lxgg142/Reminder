import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import { TaskContext } from "../context/task";
import { ThemeContext } from "../context/theme";
import Header from "./components/Header";
import TaskItem from "./components/TaskItem";

export default function MainScreen({ navigation }) {
  const { theme } = useContext(ThemeContext);
  const { tasks, deleteTask, markTask, unMarkTask } = useContext(TaskContext);

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
          extraData={tasks}
          ItemSeparatorComponent={() => {
            return <View style={{ backgroundColor: theme.sep, height: 1 }} />;
          }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }, index) => {
            return (
              <TaskItem
                onPress={() =>
                  navigation.navigate("viewTask", {
                    task: item,
                  })
                }
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
