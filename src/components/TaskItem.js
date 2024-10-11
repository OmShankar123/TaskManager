import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../theme/colors';

const TaskItem = ({ task, onDelete, onToggleCompletion, onPress }) => {
  const getIconName = () => {
    switch (task.status) {
      case 'Completed':
        return 'checkmark'; 
      case 'In Progress':
        return 'play-circle'; 
      default:
        return 'hourglass'; 
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return colors.secondary; 
      case 'In Progress':
        return colors.placeholder; 
      case 'Completed':
        return '#228B22'; 
      default:
        return colors.text; 
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Delete Task',
      'Are you sure you want to delete this task?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: onDelete, 
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <View>
      <View style={styles.card}>
        {task.status === 'Completed' && (
          <Icon name="checkmark-circle" size={26} color={'#228B22'} style={styles.completedIcon} />
        )}
        
        {task.status !== 'Completed' && (
          <TouchableOpacity style={styles.editButton} onPress={onPress}>
            <Icon name="create-outline" size={20} color={colors.background} />
          </TouchableOpacity>
        )}

        <View style={styles.row}>
          <View style={styles.profileLetter}>
            <Text style={styles.profileText}>{task.title.charAt(0).toUpperCase()}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text numberOfLines={2} style={[styles.taskTitle, { textDecorationLine: task.status === 'Completed' ? 'line-through' : 'none' }]}>
              {task.title}
            </Text>
            <Text numberOfLines={4} style={styles.taskDescription}>{task.description}</Text>
            <Text style={styles.dueDate}>Due Date: {new Date(task.dueDate).toLocaleDateString()}</Text>
            <Text style={[styles.status, { color: getStatusColor(task.status) }]}>{task.status}</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={[styles.button, task.status === 'Completed' ? styles.undoButton : styles.completeButton]} 
            onPress={onToggleCompletion}
          >
            <Icon name={getIconName()} size={20} color={colors.background} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.deleteButton} onPress={confirmDelete}>
            <Icon name="trash-outline" size={20} color={colors.background} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.text,
    borderRadius: 15,
    padding: 20,
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderWidth: 0.5,
    borderColor: colors.secondary,
    position: 'relative',
    marginHorizontal: 5,
    width: 310,
  },
  completedIcon: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  editButton: {
    position: 'absolute',
    top: 10,
    right: 15,
  },
  row: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  profileLetter: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  profileText: {
    color: colors.background,
    fontWeight: 'bold',
    fontSize: 22,
  },
  textContainer: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.placeholder,
  },
  taskDescription: {
    fontSize: 16,
    color: colors.label,
    marginBottom: 5,
  },
  dueDate: {
    fontSize: 14,
    color: '#3498db',
  },
  status: {
    fontSize: 14,
    marginBottom: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    padding: 5,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
    paddingHorizontal: 20,
  },
  completeButton: {
    backgroundColor: colors.secondary,
  },
  undoButton: {
    backgroundColor: colors.primary,
  },
  deleteButton: {
    alignItems: 'center',
    borderRadius: 5,
  },
});

export default TaskItem;
