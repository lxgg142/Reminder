import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';


export default TaskItem = (props) => {

    return (
        <View style={styles.container}>
            <View style={styles.taskContainer}>
                <TouchableOpacity onPress={() => props.markTask()} >
                    <View style={styles.square}>
                    {
                        props.task.completed ? 
                        <MaterialIcons name="check" size={18} color={'#fff'} /> :
                        <Text></Text>
                    }
                    </View>
                </TouchableOpacity>
                <Text style={styles.task}>{props.task.label}</Text>
                <TouchableOpacity onPress={() => props.deleteTask()}>
                        <MaterialIcons name="delete" size={18} color={'red'} />
                </TouchableOpacity>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: '#5f6c80',
        borderRadius: 5,
        marginRight: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    taskContainer: {
        backgroundColor: '#fff',
        borderColor: '#5f6c80',
        borderLeftWidth: 4,
        flexDirection: 'row',
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 15,    
    },
    task: {
        color: '#5f6c80',
        width: '80%',
        paddingRight: 2,
        fontSize: 15,
    }
});