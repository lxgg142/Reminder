import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  View,
  Alert,
  StyleSheet,
  FlatList,
  Platform,
} from 'react-native';

import TaskInputField from '../components/TaskInputField';
import TaskItem from '../components/TaskItem';

import { useHeaderHeight } from '@react-navigation/elements'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MainScreen() {
  
  const headerHeight = useHeaderHeight()
  const [tasks, setTasks] = useState([]);

  React.useEffect(() => {
    getTasksFromUserDevice();
  }, []);

  React.useEffect(() => {
    saveTasksToUserDevice(tasks);
  }, [tasks]);

  const addTask = (task) => {
    if (task == null) return;
    const newTask = {
      id: Math.random(),
      label: task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    Keyboard.dismiss();
  };

  const markTask = (taskID) => {
    const newTask = tasks.map((item) => {
      if (item.id == taskID) {
        return { ...item, completed: true };
      }
      return item;
    });
    setTasks(newTask);
  };

  const unMarkTask = (taskID) => {
    const newTask = tasks.map((item) => {
      if (item.id == taskID) {
        return { ...item, completed: false };
      }
      return item;
    });
    setTasks(newTask);
  };

  const deleteTask = (taskId) => {
    const newTasksItem = tasks.filter((item) => item.id != taskId);
    setTasks(newTasksItem);
  };

  const clearAllTasks = () => {
    if (tasks != '') {
      Alert.alert('Confirm', 'Clear tasks?', [
        {
          text: 'Yes',
          onPress: () => setTasks([]),
        },
        {
          text: 'No',
        },
      ]);
    }
  };

  const saveTasksToUserDevice = async (tasks) => {
    try {
      const stringifyTasks = JSON.stringify(tasks);
      await AsyncStorage.setItem('tasks', stringifyTasks);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasksFromUserDevice = async () => {
    try {
      const tasks = await AsyncStorage.getItem('tasks');
      if (tasks != null) {
        setTasks(JSON.parse(tasks));
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <KeyboardAvoidingView
      style={styles.container}
      keyboardVerticalOffset={headerHeight}
      {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}>
      <FlatList
        data={tasks}
        ItemSeparatorComponent={() => {
          return <View style={styles.Separator}></View>;
        }}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }, index) => {
          
          return (
              <TaskItem
                index={index + 1}
                task={item}
                deleteTask={() => deleteTask(item.id)}
                markTask={() => {
                  if (item.completed == false) {
                    markTask(item.id);
                  } else {
                    unMarkTask(item.id);
                  }
                }}
              />
          );
        }}
      />
      <TaskInputField addTask={addTask}/>
    </KeyboardAvoidingView>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  Separator: {
    height: 1,
  },
});