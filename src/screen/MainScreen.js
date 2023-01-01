import React, { useContext, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  View,
  Alert,
  StyleSheet,
  FlatList,
  Platform,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Modal,
} from 'react-native';


import TaskAddModal from '../components/TaskAddModal';
import TaskItem from '../components/TaskItem';

import { MaterialIcons } from '@expo/vector-icons';

import { useHeaderHeight } from '@react-navigation/elements'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemeContext } from '../context/ThemeContext';


export default function MainScreen({navigation}) {
  
  const headerHeight = useHeaderHeight()
  const {theme, priority} = useContext(ThemeContext);
  
  const [tasks, setTasks] = useState([]);
  const [priorityState, setPriorityState] = useState('default');

  const [btrVisible, setBtrVisible] = useState(false);

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
      priority: priorityState 
    };
    setTasks([...tasks, newTask]);
    setPriorityState('default');
    Keyboard.dismiss();
    setBtrVisible(!btrVisible)
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
      await AsyncStorage.setItem('tasks', JSON.stringify(tasks));
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
        <Modal
          visible={btrVisible}
        >
          <TaskAddModal addTask={addTask} setPriority={setPriorityState} setBtr={setBtrVisible} currentPriorityState={priorityState}/>
        </Modal>
        <SafeAreaView style={styles.container}>
          <View style={{flexDirection: 'row'}}>
            <View 
              style={{
                alignItems: 'center', 
                flex: 1, 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                paddingVertical: 20,
                paddingHorizontal: 30,
                borderBottomColor: theme.sep,
                borderBottomWidth: 1
              }}>
              <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.text}}>Simple Todo</Text>
              <TouchableOpacity onPress={() => setBtrVisible(!btrVisible)}>
                <MaterialIcons name="add" size={24} color={theme.text}/>
              </TouchableOpacity>
            </View>
          </View>
          <FlatList
            data={tasks}
            ItemSeparatorComponent={() => {
              return <View style={[styles.Separator, {backgroundColor: theme.sep}]}></View>;
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
        </SafeAreaView>
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