import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useDispatch } from 'react-redux';
import { addTask, editTask } from '../redux/tasksSlice';
import { getTasks, storeTasks } from '../storage/storage';
import colors from '../theme/colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/Ionicons';

const TaskForm = ({ existingTask, onClose, onSubmit }) => {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(existingTask ? existingTask.title : '');
  const [description, setDescription] = useState(existingTask ? existingTask.description : '');
  const [dueDate, setDueDate] = useState(existingTask ? new Date(existingTask.dueDate) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSubmit = async () => {
    if (!title.trim()) {
      alert('Title is required!');
      return;
    }

    const task = {
      id: existingTask ? existingTask.id : Date.now(),
      title,
      description,
      dueDate: dueDate.toISOString(),
      createdAt: existingTask ? existingTask.createdAt : new Date().toISOString(),
      completed: existingTask ? existingTask.completed : false,
      status:existingTask?existingTask.status : 'Pending',
    };

    onSubmit(task);
    onClose(); 
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || dueDate;
    setShowDatePicker(false);
    setDueDate(currentDate);
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.label}>Task Title</Text>
        <TextInput 
          placeholder="Enter task title" 
          value={title} 
          onChangeText={setTitle} 
          style={styles.input} 
          placeholderTextColor={colors.label}
        />
        
        <Text style={styles.label}>Description</Text>
        <TextInput 
          placeholder="Enter task description" 
          value={description} 
          onChangeText={setDescription} 
          style={styles.descriptionInput} 
          placeholderTextColor={colors.label}
          multiline={true}
          numberOfLines={4} 
        />
        
        <Text style={styles.label}>Due Date</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
          <Text style={styles.dateText}>{`${dueDate.toLocaleDateString()}`}</Text>
          <Icon name="calendar-outline" size={24} color={colors.text} style={styles.icon} />
        </TouchableOpacity>
        
        {showDatePicker && (
          <DateTimePicker
            value={dueDate}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
        
        <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
          <Text style={styles.saveButtonText}>Save Task</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 25,
    borderRadius: 10,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    backgroundColor: colors.text,
    shadowColor: colors.secondary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 8,
    top: 65,
    flex: 1,
  },
  label: {
    fontSize: 18,
    color: colors.label,
    marginBottom: 5,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.secondary,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#d5dbd6',
    color: colors.primary,
    fontSize: 18,
  },
  descriptionInput: {
    borderWidth: 1,
    borderColor: colors.secondary,
    marginBottom: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#d5dbd6',
    color: colors.primary,
    fontSize: 18,
    height: 100, 
    textAlignVertical: 'top', 
  },
  datePicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colors.secondary,
    backgroundColor: '#d5dbd6',
    marginBottom: 10,
  },
  dateText: {
    fontSize: 18,
    color: colors.text,
  },
  icon: {
    marginLeft: 10,
  },
  saveButton: {
    backgroundColor: colors.secondary,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 25,
  },
  saveButtonText: {
    color: colors.background,
    fontSize: 18,
    fontWeight: '600',
  },
});

export default TaskForm;

