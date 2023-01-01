import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import React, { useContext } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TaskContext } from "../context/TaskContext";
import { useHeaderHeight } from "@react-navigation/elements";
import { ThemeContext } from "../context/ThemeContext";
import TaskItem from "../components/TaskItem";

export default function MainScreen({ navigation }) {
  const headerHight = useHeaderHeight();

  const { theme } = useContext(ThemeContext);
  const { tasks, deleteTask, markTask, unMarkTask } = useContext(TaskContext);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={headerHight}
      {...(Platform.OS === "ios" ? { behavior: "padding" } : {})}
    >
      <SafeAreaView style={styles.container}>
        {/**header */}
        <View style={{ flexDirection: "row" }}>
          <View
            style={[
              styles.header,
              { borderColor: theme.sep, borderBottomWidth: 1 },
            ]}
          >
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}
            >
              Simple Todo
            </Text>
            <TouchableOpacity onPress={() => navigation.push("task")}>
              <MaterialIcons name="add" size={24} color={theme.text} />
            </TouchableOpacity>
          </View>
        </View>
        {/**content */}
        <FlatList
          data={tasks}
          ItemSeparatorComponent={() => {
            return (
              <View
                style={[styles.Separator, { backgroundColor: theme.sep }]}
              ></View>
            );
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
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Separator: {
    height: 1,
  },
  header: {
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
});
