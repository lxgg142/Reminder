import {
  View,
  Text,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from "react-native";

import React, { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TaskContext } from "../context/TaskContext";
import { ThemeContext } from "../context/ThemeContext";

export default function TaskScreen({ navigation }) {
  const { theme, priority } = useContext(ThemeContext);
  const [task, setTask] = useState("");

  const { addTask, priorityState, changePriorityState, prioritys } =
    useContext(TaskContext);

  const goBack = () => navigation.goBack();

  const handleAddTask = (value) => {
    if (value == null || value == "") return goBack();
    addTask(value);
    goBack();
    changePriorityState(prioritys.default);
    setTask("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      <KeyboardAvoidingView
        style={styles.container}
        {...(Platform.OS === "ios" ? { behavior: "padding" } : {})}
      >
        {/**Header */}
        <View style={{ flexDirection: "row" }}>
          <View
            style={[
              styles.header,
              {
                borderColor: theme.sep,
                borderBottomWidth: 1,
                marginTop: StatusBar.currentHeight,
              },
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
              onChangeText={(text) => {
                setTask(text);
              }}
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
      </KeyboardAvoidingView>
    </SafeAreaView>
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
