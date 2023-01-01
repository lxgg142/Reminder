import React, { useContext, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { ThemeContext } from "../context/ThemeContext";

export default TaskItem = (props) => {
  const { theme, priority } = useContext(ThemeContext);

  const [priorityState, setPriorityState] = useState(props.task.priority);

  const priorityColor = (state) => {
    switch (state) {
      case "low":
        return priority.low;
      case "medium":
        return priority.medium;
      case "high":
        return priority.high;
      case "default":
        return priority.default;
      default:
        return priority.default;
    }
  };

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.taskContainer,
          {
            backgroundColor: theme.background,
            borderColor: priorityColor(priorityState),
          },
        ]}
      >
        <TouchableOpacity onPress={() => props.markTask()}>
          <View
            style={[
              styles.square,
              { backgroundColor: priorityColor(priorityState) },
            ]}
          >
            {props.task.completed ? (
              <MaterialIcons name="check" size={18} color={theme.ico} />
            ) : (
              <></>
            )}
          </View>
        </TouchableOpacity>
        <Text style={[styles.task, { color: theme.text }]}>
          {props.task.label}
        </Text>
        <TouchableOpacity onPress={() => props.deleteTask()}>
          <MaterialIcons name="delete" size={18} color={theme.del} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  square: {
    width: 24,
    height: 24,
    borderRadius: 5,
    marginRight: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  taskContainer: {
    borderLeftWidth: 4,
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    justifyContent: "center",
  },
  task: {
    width: "80%",
    paddingRight: 2,
    fontSize: 15,
  },
});
