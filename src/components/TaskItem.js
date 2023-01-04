import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

export default TaskItem = (props) => {
  const { theme, priority } = useContext(ThemeContext);
  const priorityColor = props.task.priority || priority.default;

  return (
    <View
      style={[
        styles.container,
        {
          borderColor: priorityColor,
        },
      ]}
    >
      <TouchableOpacity onPress={() => props.markTask()} style={styles.button}>
        <View style={[styles.square, { backgroundColor: priorityColor }]}>
          {props.task.completed ? (
            <MaterialIcons name="check" size={18} color={theme.ico} />
          ) : (
            <></>
          )}
        </View>
      </TouchableOpacity>
      <Pressable onPress={props.onPress} style={styles.task}>
        <Text style={{ color: theme.text }}>{props.task.label}</Text>
      </Pressable>
      <TouchableOpacity
        onPress={() => props.deleteTask()}
        style={styles.button}
      >
        <View style={styles.delete}>
          <MaterialIcons name="delete" size={18} color={theme.del} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    minHeight: 50,
    borderLeftWidth: 4,
  },
  button: {
    width: "15%",
    justifyContent: "center",
    alignItems: "center",
  },
  square: {
    width: 24,
    height: 24,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  task: {
    paddingRight: 2,
    fontSize: 15,
    justifyContent: "center",
    width: "70%",
  },
  delete: {
    justifyContent: "center",
    alignItems: "center",
  },
});
