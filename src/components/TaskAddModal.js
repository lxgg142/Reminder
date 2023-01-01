import React, { useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  Text
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { ThemeContext } from '../context/ThemeContext';
import { useHeaderHeight } from '@react-navigation/elements';

export default TaskAddModal = (props) => {

    const {theme, priority} = useContext(ThemeContext);
    const headerHeight = useHeaderHeight()
    const [task, setTask] = useState();
    const handleAddTask = (value) => {
        if (value == null) props.setBtr(false)
        props.addTask(value);
        setTask('');
    };

    let priorityState = props.currentPriorityState;


    return (
      <KeyboardAvoidingView
        style={[styles.container, {backgroundColor: theme.background}]}
        keyboardVerticalOffset={headerHeight}
        {...(Platform.OS === 'ios' ? { behavior: 'padding' } : {})}>
          <SafeAreaView>
          <View style={{flexDirection: 'row'}}>
            <View 
              style={{
                alignItems: 'center', 
                flex: 1, 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                paddingVertical: 20,
                paddingHorizontal: 30,
              }}>
                <Text style={{fontSize: 20, fontWeight: 'bold', color: theme.text}}>Neues Todo</Text>
                <TouchableOpacity onPress={() => handleAddTask(task)}>
                  { 
                    task ? 
                    <MaterialIcons name="add" size={24} color={theme.text} /> :
                    <MaterialIcons name="close" size={24} color={theme.text} />
                  }
                </TouchableOpacity>
              </View>
            </View>
            <View style={{                  
              borderBottomColor: theme.sep,
              borderBottomWidth: 1}}></View>
            <View style={{paddingHorizontal: 10}}>
              <View>
                <TextInput
                  style={[styles.inputField, {color: theme.text}]}
                  value={task}
                  onChangeText={(text) => setTask(text)}
                  placeholder={'Schreib eine Aufgabe'}
                  placeholderTextColor={theme.secondary}
                  selectionColor={theme.secondary}
                />
                <View style={{                  
                borderBottomColor: theme.sep,
                borderBottomWidth: 1}}></View>
              </View>
              <View style={styles.items}>
                <Text style={{fontSize: 15, fontWeight: 'bold', paddingVertical: 10, color: theme.text}}>Priorität - {String(priorityState).toUpperCase()} </Text>
                <View style={[{padding: 5, flexDirection: 'row'}]}>
                  
                  <TouchableOpacity style={[styles.colorItem, {backgroundColor: priority.default}]} 
                      onPress={() => props.setPriority('default')}
                  >
                      {   
                          priorityState == 'default' ?
                          <MaterialIcons name='check' size={28} color={theme.text}/> :
                          <></>
                      }
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.colorItem, {backgroundColor: priority.low}]} 
                      onPress={() => props.setPriority('low')}
                  >
                      {   
                          priorityState == 'low' ?
                          <MaterialIcons name='check' size={28} color={theme.text}/> :
                          <></>
                      }
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.colorItem, {backgroundColor: priority.medium}]} 
                      onPress={() => props.setPriority('medium')}
                  >
                      {   
                          priorityState == 'medium' ?
                          <MaterialIcons name='check' size={28} color={theme.text}/> :
                          <></>
                      }
                  </TouchableOpacity>

                  <TouchableOpacity style={[styles.colorItem, {backgroundColor: priority.high}]} 
                      onPress={() => props.setPriority('high')}
                  >
                      {   
                          priorityState == 'high' ?
                          <MaterialIcons name='check' size={28} color={theme.text}/> :
                          <></>
                      }
                  </TouchableOpacity>

                </View>
              </View>
              <View style={{                  
                borderBottomColor: theme.sep,
                borderBottomWidth: 1}}></View>
            </View>
            
          </SafeAreaView>
      </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inputField: {
    height: 50,
    paddingHorizontal: 20,
  },
  button: {
    height: 30,
    width: 30,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  items: {
    paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 10
  },
  colorItem: {
    height: 60,
    width: 60,
    borderRadius: 15,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
