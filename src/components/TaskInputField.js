import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';


export default TaskInputField = (props) => {

    const {theme} = useContext(ThemeContext);


    const [task, setTask] = useState();

    const handleAddTask = (value) => {
        if (value == null) return
        props.addTask(value);
        setTask('');
    };

    return (
        <View style={[styles.container, {backgroundColor: theme.background, borderColor: theme.sep}]}>
            <TextInput
                style={[styles.inputField, {backgroundColor: theme.background, color: theme.text}]}
                value={task}
                onChangeText={(text) => setTask(text)}
                placeholder={'Write a reminder'}
                placeholderTextColor={theme.text}
            />
            <TouchableOpacity onPress={() => handleAddTask(task)}>
                <View style={[styles.button, {backgroundColor: theme.secondary}]}>
                    <MaterialIcons
                        name="keyboard-arrow-up"
                        size={24}
                        color={theme.ico}
                    />
                </View>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    elevation: 10,
    borderTopWidth: 1,
  },
  inputField: {
    height: 50,
    flex: 1,
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
