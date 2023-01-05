import React, { useContext, useState } from "react";
import { LanguageContext } from "../context/language";
import { ThemeContext } from "../context/ThemeContext";
import Header from "../components/Header";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
  Keyboard,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import List, { Separator, Button, ListView } from "../components/List";
import { TaskContext } from "../context/TaskContext";
import Content from "../components/Content";

const EditScreen = ({ navigation, route }) => {
  const params = route.params;

  const { theme, priority } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const { changePriority, changeLabel, changeDescription, getTask } =
    useContext(TaskContext);

  const taskID = params.task.id;
  const item = getTask(taskID);

  const [task, setTask] = useState(item.label);
  const [priorityState, setPriorityState] = useState(item.priority);
  const [description, setDescription] = useState(item.description);

  const handleSave = () => {
    if (task != item.task) {
      if (!/^\s*$/.test(task)) changePriority(priorityState, taskID);
    }
    if (description != item.description) changeDescription(description, taskID);
    if (priorityState != item.priority) changePriority(priorityState, taskID);
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
              <MaterialIcons name="arrow-back" size={24} color={theme.text} />
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
              <Separator />
              <View style={{ paddingVertical: 10 }}>
                <TextInput
                  style={[
                    styles.inputField,
                    { color: theme.text, height: 150 },
                  ]}
                  multiline={true}
                  value={description}
                  onChangeText={(text) => {
                    setDescription(text);
                  }}
                  placeholder={language.edit.newDescription}
                  placeholderTextColor={theme.secondary}
                  selectionColor={theme.secondary}
                />
              </View>
            </List>
            <List title={language.edit.priority}>
              <ListView>
                <View style={[{ flexDirection: "row" }]}>
                  <TouchableOpacity
                    style={[
                      styles.colorItem,
                      { backgroundColor: priority.default },
                    ]}
                    onPress={() => {
                      setPriorityState(priority.default);
                    }}
                  >
                    {priorityState == priority.default ? (
                      <MaterialIcons
                        name="check"
                        size={28}
                        color={theme.text}
                      />
                    ) : (
                      <></>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.colorItem,
                      { backgroundColor: priority.low },
                    ]}
                    onPress={() => {
                      setPriorityState(priority.low);
                    }}
                  >
                    {priorityState == priority.low ? (
                      <MaterialIcons
                        name="check"
                        size={28}
                        color={theme.text}
                      />
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
                      setPriorityState(priority.medium);
                    }}
                  >
                    {priorityState == priority.medium ? (
                      <MaterialIcons
                        name="check"
                        size={28}
                        color={theme.text}
                      />
                    ) : (
                      <></>
                    )}
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.colorItem,
                      { backgroundColor: priority.high },
                    ]}
                    onPress={() => {
                      setPriorityState(priority.high);
                    }}
                  >
                    {priorityState == priority.high ? (
                      <MaterialIcons
                        name="check"
                        size={28}
                        color={theme.text}
                      />
                    ) : (
                      <></>
                    )}
                  </TouchableOpacity>
                </View>
              </ListView>
            </List>
            <List>
              <Button
                title={language.edit.save}
                color={theme.secondary}
                onPress={() => {
                  handleSave();
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
