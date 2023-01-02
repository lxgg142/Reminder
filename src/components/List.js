import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const List = ({ children, title }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.items}>
      <Text
        style={{
          fontSize: 15,
          fontWeight: "bold",
          paddingVertical: 10,
          color: theme.text,
        }}
      >
        {title}
      </Text>
      <View
        style={{
          marginTop: 5,
          borderColor: theme.sep,
          borderWidth: 1,
          borderRadius: 15,
        }}
      >
        {children}
      </View>
    </View>
  );
};

export const ListItem = ({ title, value, color }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <View style={styles.item}>
      <Text style={{ color: color ? color : theme.text }}>{title}</Text>
      <Text style={{ color: color ? color : theme.text }}>{value}</Text>
    </View>
  );
};

export const Separator = () => {
  const { theme } = useContext(ThemeContext);
  return <View style={{ backgroundColor: theme.sep, height: 1 }} />;
};

export default List;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  items: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10,
  },
  item: {
    minHeight: 50,
    justifyContent: "space-between",
    marginHorizontal: 15,
    paddingVertical: 15,
    flexDirection: "row",
  },
});
