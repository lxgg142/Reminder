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
import { TaskContext } from "../context/task";
import { ThemeContext } from "../context/theme";
import Header from "./components/Header";
import List, { ListItem, ListView, Separator } from "./components/List";
import Content from "./components/Content";
import { LanguageContext } from "../context/language";
import { SettingsContext } from "../context/settings";

import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function TaskScreen({ navigation }) {
  const { theme, priority } = useContext(ThemeContext);
  const { addTask } = useContext(TaskContext);
  const { descriptionView } = useContext(SettingsContext);

  const [date, setDate] = useState(moment().format("DD.MM.YYYY"));

  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priorityState, changePriorityState] = useState(priority.default);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const goBack = () => navigation.goBack();
  const { language, currentLanguage } = useContext(LanguageContext);

  const handleAddTask = (value, description, priority, date) => {
    if (/^\s*$/.test(task)) return goBack();
    addTask(value, description, priority, date);
    goBack();
    changePriorityState(priority.default);
    setTask("");
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setDate(moment(date).format("DD.MM.YYYY"));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {/**Header */}
      <Pressable onPress={() => Keyboard.dismiss()}>
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
        <Content style={{ marginBottm: 20 }}></Content>
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
