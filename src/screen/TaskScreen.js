import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  StatusBar,
  Keyboard,
  Pressable,
} from "react-native";

var moment = require("moment-timezone");

import React, { useContext, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { TaskContext } from "../context/TaskContext";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";
import List, { ListItem, ListView, Separator } from "../components/List";
import Content from "../components/Content";
import { LanguageContext } from "../context/language";

export default function TaskScreen({ navigation }) {
  const { theme, priority } = useContext(ThemeContext);
  const { addTask } = useContext(TaskContext);

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priorityState, changePriorityState] = useState(priority.default);
  const date = moment().format("DD.MM.YYYY");

  const goBack = () => navigation.goBack();
  const { language } = useContext(LanguageContext);

  const handleAddTask = (value, description, priority, date) => {
    if (/^\s*$/.test(task)) return goBack();
    addTask(value, description, priority, date);
    goBack();
    changePriorityState(priority.default);
    setTask("");
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {/**Header */}
      <Pressable onPress={Keyboard.dismiss} accessible={false}>
        <Header>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
            {language.task.title}
          </Text>
          <TouchableOpacity
            onPress={() =>
              handleAddTask(task, description, priorityState, date)
            }
          >
            {/^\s*$/.test(task) ? (
              <MaterialIcons name="close" size={24} color={theme.text} />
            ) : (
              <MaterialIcons name="add" size={24} color={theme.text} />
            )}
          </TouchableOpacity>
        </Header>
        {/**content */}
        <Content style={{ marginBottm: 20 }}>
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
            <Separator />
            <View style={{ paddingVertical: 10 }}>
              <TextInput
                style={[styles.inputField, { color: theme.text, height: 150 }]}
                multiline={true}
                value={description}
                onChangeText={(text) => {
                  setDescription(text);
                }}
                placeholder={"Description"}
                placeholderTextColor={theme.secondary}
                selectionColor={theme.secondary}
              />
            </View>
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
          <List>
            <ListItem title={"Date"} value={date} />
          </List>
        </Content>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  inputField: {
    minHeight: 50,
    paddingHorizontal: 20,
    overflow: "scroll",
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
