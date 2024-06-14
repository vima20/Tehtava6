import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux'; // Import useDispatch for use in action creators

const initialState = {
  message: 'Welcome to the Anecdote App!',
  showNotification: false, // Add a new state property to track notification visibility
  timeoutId: null, // Initialize a timeoutId to store the timeout reference
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload;
    },
    showNotification: (state, action) => {
      state.showNotification = true;
      // Clear any existing timeout
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
      }
      // Set a new timeout to hide the notification after 5 seconds
      const timeoutId = setTimeout(() => {
        state.showNotification = false;
        dispatch({ type: 'clearNotification' }); // Dispatch clearNotification action
      }, 5000);
      state.timeoutId = timeoutId;
    },
    clearNotification: (state) => {
      state.showNotification = false;
      // Clear the timeout if it exists
      if (state.timeoutId) {
        clearTimeout(state.timeoutId);
        state.timeoutId = null;
      }
    },
  },
});

export const { setNotification, showNotification, clearNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
