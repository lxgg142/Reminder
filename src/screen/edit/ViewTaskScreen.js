import { MaterialIcons } from "@expo/vector-icons";
import React, { useContext } from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { LanguageContext } from "../../context/language";
import { SettingsContext } from "../../context/settings";
import { TaskContext } from "../../context/task";
import { ThemeContext } from "../../context/theme";
import Content from "../components/Content";
import Header from "../components/Header";
import List, { Button, ListItem, Separator } from "../components/List";

const ViewTaskScreen = ({ navigation, route }) => {
  const params = route.params;
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  const { getTask, deleteTask, testTask } = useContext(TaskContext);
  const { descriptionView } = useContext(SettingsContext);

  const taskID = params.task.id;
  const task = getTask(taskID);

  const handleDelete = (taskID) => {
    deleteTask(taskID);
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      <View style={{ flex: 1 }}>
        {/**header */}
        <Header>
          <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.text }}>
            {language.view.title}
          </Text>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <MaterialIcons name="arrow-back" size={24} color={theme.text} />
          </TouchableOpacity>
        </Header>
        {/**content */}
        <Content style={{ marginBottm: 20 }}>
          <List>
            <ListItem title={task.label} />
            {task.description ? (
              descriptionView ? (
                <>
                  <Separator />
                  <ListItem title={task.description} />
                </>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
          </List>
          <List>
            <ListItem
              title={language.view.completed}
              value={String(task.completed).toUpperCase()}
            />
            <Separator />
            <View
              style={{
                minHeight: 50,
                justifyContent: "space-between",
                marginHorizontal: 15,
                paddingVertical: 15,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Text style={{ color: theme.text }}>
                {language.view.priority}
              </Text>
              <View
                style={{
                  width: 24,
                  height: 24,
                  borderRadius: 5,
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: task.priority,
                }}
              >
                {task.completed ? (
                  <MaterialIcons name="check" size={18} color={theme.ico} />
                ) : (
                  <></>
                )}
              </View>
            </View>
            {task.date ? (
              <>
                <Separator />
                <ListItem title={language.view.created} value={task.date} />
              </>
            ) : (
              <></>
            )}
          </List>
          <List>
            <Button
              title={language.view.edit}
              color={theme.secondary}
              onPress={() => {
                navigation.navigate("edit", {
                  task: task,
                });
              }}
            />
            <Separator />
            <Button
              title={language.view.delete}
              color={theme.del}
              onPress={() => handleDelete(taskID)}
            />
          </List>
        </Content>
      </View>
    </SafeAreaView>
  );
};
export default ViewTaskScreen;

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
