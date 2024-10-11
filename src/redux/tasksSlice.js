import { createSlice } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: [],
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
    },
    // editTask: (state, action) => {
    //   const index = state.findIndex(task => task.id === action.payload.id);
    //   if (index !== -1) {
    //     state[index] = action.payload;
    //   }
    editTask: (state, action) => {
      const index = state.findIndex(task => task.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload; // Update task with both status and completed
      }
    

    },
    deleteTask: (state, action) => {
      return state.filter(task => task.id !== action.payload);
    },
    toggleTaskCompletion: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        task.completed = !task.completed; // Toggle the completed boolean
      }
    },
    toggleTaskStatus: (state, action) => {
      const task = state.find(task => task.id === action.payload);
      if (task) {
        // Cycle through statuses
        task.status = task.status === 'Pending' 
          ? 'In Progress' 
          : task.status === 'In Progress' 
          ? 'Completed' 
          : 'Pending';
      }
    },
  },
});

export const { addTask, editTask, deleteTask, toggleTaskCompletion, toggleTaskStatus } = tasksSlice.actions;

export default tasksSlice.reducer;
