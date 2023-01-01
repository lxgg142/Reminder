import {
  View,
  Text,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";

import React, { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TaskContext } from "../context/TaskContext";
import { useHeaderHeight } from "@react-navigation/elements";
import { ThemeContext } from "../context/ThemeContext";
import TaskItem from "../components/TaskItem";

export default function TaskContainer({ navigation }) {
  const headerHight = useHeaderHeight();

  const { theme, priority } = useContext(ThemeContext);
  const [task, setTask] = useState();

  const { addTask, priorityState, changePriorityState, prioritys } =
    useContext(TaskContext);

  const goBack = (value) => navigation.push(value);

  const handleAddTask = (value) => {
    if (value == null) {
      goBack("main");
    }
    addTask(value);
    goBack("main");
    changePriorityState(prioritys.default);
    setTask("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={headerHight}
      {...(Platform.OS === "ios" ? { behavior: "padding" } : {})}
    >
      <SafeAreaView style={styles.container}>
        {/**Header */}
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
              Neues Todo
            </Text>
            <TouchableOpacity onPress={() => handleAddTask(task)}>
              {task ? (
                <MaterialIcons name="add" size={24} color={theme.text} />
              ) : (
                <MaterialIcons name="close" size={24} color={theme.text} />
              )}
            </TouchableOpacity>
          </View>
        </View>

        {/**content */}
        <View style={{ paddingHorizontal: 10 }}>
          <View>
            <TextInput
              style={[styles.inputField, { color: theme.text }]}
              value={task}
              onChangeText={(text) => setTask(text)}
              placeholder={"Schreib eine Aufgabe"}
              placeholderTextColor={theme.secondary}
              selectionColor={theme.secondary}
            />
            <View
              style={{
                borderBottomColor: theme.sep,
                borderBottomWidth: 1,
              }}
            ></View>
          </View>
          <View style={styles.items}>
            <Text
              style={{
                fontSize: 15,
                fontWeight: "bold",
                paddingVertical: 10,
                color: theme.text,
              }}
            >
              Priorität - {String(priorityState).toUpperCase()}{" "}
            </Text>
            <View style={[{ padding: 5, flexDirection: "row" }]}>
              <TouchableOpacity
                style={[
                  styles.colorItem,
                  { backgroundColor: priority.default },
                ]}
                onPress={() => {
                  changePriorityState(prioritys.default);
                }}
              >
                {priorityState == "default" ? (
                  <MaterialIcons name="check" size={28} color={theme.text} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.colorItem, { backgroundColor: priority.low }]}
                onPress={() => {
                  changePriorityState(prioritys.low);
                }}
              >
                {priorityState == "low" ? (
                  <MaterialIcons name="check" size={28} color={theme.text} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.colorItem, { backgroundColor: priority.medium }]}
                onPress={() => {
                  changePriorityState(prioritys.medium);
                }}
              >
                {priorityState == "medium" ? (
                  <MaterialIcons name="check" size={28} color={theme.text} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.colorItem, { backgroundColor: priority.high }]}
                onPress={() => {
                  changePriorityState(prioritys.high);
                }}
              >
                {priorityState == "high" ? (
                  <MaterialIcons name="check" size={28} color={theme.text} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              borderBottomColor: theme.sep,
              borderBottomWidth: 1,
            }}
          ></View>
        </View>
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
  inputField: {
    height: 50,
    paddingHorizontal: 20,
  },
  items: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  colorItem: {
    height: 60,
    width: 60,
    borderRadius: 15,
    marginRight: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
