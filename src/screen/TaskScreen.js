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
import Header from "../components/Header";
import { LanguageContext } from "../context/Language";
import List, { ListView, Separator } from "../components/List";

export default function TaskScreen({ navigation }) {
  const { theme, priority } = useContext(ThemeContext);
  const [task, setTask] = useState("");

  const { addTask, priorityState, changePriorityState } =
    useContext(TaskContext);

  const goBack = () => navigation.goBack();
  const { language } = useContext(LanguageContext);

  const handleAddTask = (value) => {
    if (/^\s*$/.test(task)) return goBack();
    addTask(value);
    goBack();
    changePriorityState(priority.default);
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
        <Header>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
            {language.task.title}
          </Text>
          <TouchableOpacity onPress={() => handleAddTask(task)}>
            {/^\s*$/.test(task) ? (
              <MaterialIcons name="close" size={24} color={theme.text} />
            ) : (
              <MaterialIcons name="add" size={24} color={theme.text} />
            )}
          </TouchableOpacity>
        </Header>
        {/**content */}
        <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
          <List>
            <TextInput
              style={[styles.inputField, { color: theme.text }]}
              value={task}
              onChangeText={(text) => {
                setTask(text);
              }}
              placeholder={language.task.newTask}
              placeholderTextColor={theme.secondary}
              selectionColor={theme.secondary}
            />
          </List>
          <List title={language.task.priority}>
            <ListView>
              <View style={[{ flexDirection: "row" }]}>
                <TouchableOpacity
                  style={[
                    styles.colorItem,
                    { backgroundColor: priority.default },
                  ]}
                  onPress={() => {
                    changePriorityState(priority.default);
                  }}
                >
                  {priorityState == priority.default ? (
                    <MaterialIcons name="check" size={28} color={theme.text} />
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.colorItem, { backgroundColor: priority.low }]}
                  onPress={() => {
                    changePriorityState(priority.low);
                  }}
                >
                  {priorityState == priority.low ? (
                    <MaterialIcons name="check" size={28} color={theme.text} />
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.colorItem,
                    { backgroundColor: priority.medium },
                  ]}
                  onPress={() => {
                    changePriorityState(priority.medium);
                  }}
                >
                  {priorityState == priority.medium ? (
                    <MaterialIcons name="check" size={28} color={theme.text} />
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  style={[styles.colorItem, { backgroundColor: priority.high }]}
                  onPress={() => {
                    changePriorityState(priority.high);
                  }}
                >
                  {priorityState == priority.high ? (
                    <MaterialIcons name="check" size={28} color={theme.text} />
                  ) : (
                    <></>
                  )}
                </TouchableOpacity>
              </View>
            </ListView>
          </List>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputField: {
    height: 50,
    paddingHorizontal: 20,
  },
  colorItem: {
    height: 55,
    width: 55,
    borderRadius: 15,
    margin: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
