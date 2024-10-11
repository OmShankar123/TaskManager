import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import TaskItem from '../components/TaskItem';
import colors from '../theme/colors';

const TaskSection = ({ title, tasks, onDelete, onToggleCompletion, onPress }) => {
  return (
    <View style={styles.container}>
      {tasks.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>{title}</Text>
          <FlatList
            data={tasks}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TaskItem
                task={item}
                onDelete={() => onDelete(item.id)}
                onToggleCompletion={() => onToggleCompletion(item.id)}
                onPress={() => onPress(item)}
              />
            )}
            horizontal 
            showsHorizontalScrollIndicator={false} 
           
            
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.secondary,
    // marginTop: 20,
    marginBottom: 10,
  },
  
});

export default TaskSection;
