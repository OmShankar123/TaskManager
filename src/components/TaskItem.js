import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';

const TaskItem = ({ task, onDelete, onToggleCompletion, onPress }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>
        <Text style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }}>
          {task.title}
        </Text>
        <Text>{task.description}</Text>
        <Text>Due: {task.dueDate}</Text>
      </TouchableOpacity>
      <Button title={task.completed ? "Undo" : "Complete"} onPress={onToggleCompletion} />
      <Button title="Delete" onPress={onDelete} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default TaskItem;
