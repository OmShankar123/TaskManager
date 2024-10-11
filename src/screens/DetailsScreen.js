import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity } from 'react-native';
import { PieChart as GiftedPieChart } from 'react-native-gifted-charts';
import { useSelector, useDispatch } from 'react-redux';
import colors from '../theme/colors';
import { deleteTask, editTask } from '../redux/tasksSlice';
import TaskItem from '../components/TaskItem';
import Icon from 'react-native-vector-icons/Ionicons';

const DetailsScreen = ({ navigation }) => {
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();
  
  const [searchTerm, setSearchTerm] = useState('');

  // Calculate totals for each status
  const totalPending = tasks.filter(task => task.status === 'Pending').length;
  const totalInProgress = tasks.filter(task => task.status === 'In Progress').length;
  const totalCompleted = tasks.filter(task => task.status === 'Completed').length;

  // Data for the Gifted chart
  const giftedData = [
    { value: totalPending, color: colors.secondary },
    { value: totalInProgress, color: colors.placeholder },
    { value: totalCompleted, color: '#228B22' },
  ];

  const handleDelete = (taskId) => {
    dispatch(deleteTask(taskId));
  };

  const handleToggleCompletion = (taskId) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'Pending' 
          ? 'In Progress' 
          : task.status === 'In Progress' 
          ? 'Completed' 
          : 'Pending';
        return { ...task, status: newStatus };
      }
      return task;
    });

    updatedTasks.forEach(task => {
      if (task.id === taskId) {
        dispatch(editTask(task));
      }
    });
  };

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task => {
    const searchLower = searchTerm.toLowerCase();
    return (
      task.title.toLowerCase().includes(searchLower) ||
      task.status.toLowerCase().includes(searchLower) ||
      task.description.toLowerCase().includes(searchLower)
    );
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Task Overview</Text>

      
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color={colors.label} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by title, description or status"
          placeholderTextColor={colors.label}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      
      {filteredTasks.length > 0 && (
        <View style={styles.giftedChartContainer}>
          <View style={styles.row}>
            <GiftedPieChart
              data={giftedData}
              donut
              showGradient
              radius={90}
              innerRadius={60}
              innerCircleColor={'#232B5D'}
              centerLabelComponent={() => (
                <View style={styles.centerLabel}>
                  <Text style={styles.centerLabelText}>{totalPending + totalInProgress + totalCompleted}</Text>
                  <Text style={styles.centerLabelSubText}>Total Tasks</Text>
                </View>
              )}
            />
            <View style={styles.legendContainer}>
              {giftedData.map((item, index) => (
                <View key={index} style={styles.legendItem}>
                  <View style={[styles.dot, { backgroundColor: item.color }]} />
                  <Text style={styles.legendText}>{index === 0 ? 'Pending' : index === 1 ? 'In Progress' : 'Completed'}: {item.value}</Text>
                </View>
              ))}
            </View>
          </View>
        </View>
      )}

      {/* Display all tasks or fallback UI */}
      {filteredTasks.length > 0 && <Text style={styles.subTitle}>All Tasks</Text>}
      {filteredTasks.length === 0 ? (
        <View style={styles.fallbackContainer}>
          <Text style={styles.fallbackText}>No tasks available. Add some tasks to get started!</Text>
          <TouchableOpacity 
            style={styles.getStartedButton}
            onPress={() => navigation.navigate('TaskDetail')}
          >
            {/* <Icon name="add" size={50} color={colors.primary} /> */}
            <Text style={styles.buttonText}>Add Task</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredTasks} 
          renderItem={({ item }) => (
            <TaskItem
              task={item}
              onDelete={() => handleDelete(item.id)}  
              onToggleCompletion={() => handleToggleCompletion(item.id)} 
              onPress={() => navigation.navigate('TaskDetail', { task: item })}
            />
          )}
          keyExtractor={(item) => item.id.toString()}
          style={styles.taskList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.secondary,
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    marginTop: 20,
    marginBottom: 10,
  },
  giftedChartContainer: {
    marginBottom: 30,
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    marginLeft: 20,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  centerLabel: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  centerLabelText: {
    fontSize: 22,
    color: 'white',
    fontWeight: 'bold',
  },
  centerLabelSubText: {
    fontSize: 14,
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: colors.text,
    borderRadius: 5,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    color: colors.label,
  },
  taskList: {
    marginTop: 10,
  },
  fallbackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  fallbackText: {
    fontSize: 16,
    color: colors.label,
    textAlign: 'center',
  },
  createTaskButton: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: colors.secondary,
    borderRadius: 30,
    width:"100%"
  },
  getStartedButton: {
    backgroundColor: colors.secondary,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 25,
    width: '100%',
    top:20
  },
  buttonText: {
    fontSize: 18,
    color: colors.background,
    fontWeight: 'bold',
    textAlign:"center"
  },
});

export default DetailsScreen;
