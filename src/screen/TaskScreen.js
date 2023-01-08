import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext, useState } from "react";
import {
  Keyboard,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { LanguageContext } from "../context/language";
import { SettingsContext } from "../context/settings";
import { TaskContext } from "../context/task";
import { ThemeContext } from "../context/theme";
import List, { ListItem, ListView, Separator } from "../screen/components/List";
import Content from "./components/Content";
import Header from "./components/Header";

export default function TaskScreen({ navigation }) {
  const { theme, priority } = useContext(ThemeContext);
  const { addTask } = useContext(TaskContext);
  const { descriptionView } = useContext(SettingsContext);
  var moment = require("moment-timezone");

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
            {descriptionView ? (
              <>
                <Separator />
                <View style={{ paddingVertical: 10 }}>
                  <TextInput
                    style={[
                      styles.inputField,
                      { color: theme.text, height: 150 },
                    ]}
                    multiline={true}
                    textAlignVertical="top"
                    value={description}
                    onChangeText={(text) => {
                      setDescription(text);
                    }}
                    placeholder={language.task.description}
                    placeholderTextColor={theme.secondary}
                    selectionColor={theme.secondary}
                  />
                </View>
              </>
            ) : (
              <></>
            )}
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
            <TouchableOpacity onPress={showDatePicker}>
              <ListItem title={language.task.date} value={date} />
            </TouchableOpacity>

            <DateTimePickerModal
              date={new Date()}
              minimumDate={new Date()}
              isVisible={isDatePickerVisible}
              mode="date"
              locale={currentLanguage}
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
              confirmTextIOS={language.task.confirm}
              cancelTextIOS={language.task.cancel}
            />
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
