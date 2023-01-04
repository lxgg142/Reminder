import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

const List = ({ children, title }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <View style={styles.items}>
      {title ? (
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
      ) : (
        <></>
      )}
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

export const ListView = ({ children }) => {
  return <View style={styles.view}>{children}</View>;
};

export const SettingsItem = ({ title, value, selected, onPress }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <TouchableOpacity onPress={onPress} style={styles.item}>
      <Text style={{ color: selected ? theme.secondary : theme.text }}>
        {title}
      </Text>
      <Text style={{ color: selected ? theme.secondary : theme.text }}>
        {value}
      </Text>
    </TouchableOpacity>
  );
};

export const Separator = () => {
  const { theme } = useContext(ThemeContext);
  return <View style={{ backgroundColor: theme.sep, height: 1 }} />;
};

export const Button = ({ title, color, onPress, children }) => {
  const { theme } = useContext(ThemeContext);
  return (
    <TouchableOpacity onPress={onPress} style={styles.settingsItem}>
      {children ? (
        children
      ) : (
        <Text style={{ color: color ? color : theme.text }}>{title}</Text>
      )}
    </TouchableOpacity>
  );
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
    alignItems: "center",
  },
  view: {
    minHeight: 50,
    justifyContent: "center",
    marginHorizontal: 15,
    paddingVertical: 15,
    alignItems: "center",
  },
  settingsItem: {
    minHeight: 50,
    marginHorizontal: 15,
    paddingVertical: 15,
    justifyContent: "center",
    alignItems: "center",
  },
});
