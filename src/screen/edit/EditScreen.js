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
import { LanguageContext } from "../../context/language";
import { SettingsContext } from "../../context/settings";
import { TaskContext } from "../../context/task";
import { ThemeContext } from "../../context/theme";
import Content from "../components/Content";
import Header from "../components/Header";
import ColorPicker, { ColorItem } from "../components/items/colorPicker";
import List, { Button, ListView, Separator } from "../components/List";

const EditScreen = ({ navigation, route }) => {
  const params = route.params;

  const { theme, priority } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const { changePriority, changeLabel, changeDescription, getTask } =
    useContext(TaskContext);
  const { descriptionView } = useContext(SettingsContext);

  const taskID = params.task.id;
  const item = getTask(taskID);

  const [task, setTask] = useState(item.label);
  const [priorityState, setPriorityState] = useState(item.priority);
  const [description, setDescription] = useState(item.description);

  const handleSave = (task, description, priorityState, taskID) => {
    changeLabel(task, taskID);
    changeDescription(description, taskID);
    changePriority(priorityState, taskID);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={{ flex: 1 }}>
        <Pressable onPress={Keyboard.dismiss} accessible={false}>
          {/**header */}
          <Header>
            <Text
              style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}
            >
              {language.edit.title}
            </Text>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <MaterialIcons name="close" size={24} color={theme.text} />
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
                placeholder={language.edit.newTask}
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
                      placeholder={language.edit.newDescription}
                      placeholderTextColor={theme.secondary}
                      selectionColor={theme.secondary}
                    />
                  </View>
                </>
              ) : (
                <></>
              )}
            </List>
            <List title={language.edit.priority}>
              <ListView>
                <ColorPicker>
                  <ColorItem
                    onColor={priorityState == priority.default}
                    onPress={() => setPriorityState(priority.default)}
                    color={priority.default}
                  />

                  <ColorItem
                    onColor={priorityState == priority.low}
                    onPress={() => setPriorityState(priority.low)}
                    color={priority.low}
                  />

                  <ColorItem
                    onColor={priorityState == priority.medium}
                    onPress={() => setPriorityState(priority.medium)}
                    color={priority.medium}
                  />

                  <ColorItem
                    onColor={priorityState == priority.high}
                    onPress={() => setPriorityState(priority.high)}
                    color={priority.high}
                  />
                </ColorPicker>
              </ListView>
            </List>
            <List>
              <Button
                title={language.edit.save}
                color={theme.secondary}
                onPress={() => {
                  handleSave(task, description, priorityState, taskID);
                }}
              />
            </List>
          </Content>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};
export default EditScreen;

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
