import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: 'Welcome to the Anecdote App!',
};

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotification: (state, action) => {
      state.message = action.payload;
    },
  },
});

export const { setNotification } = notificationSlice.actions;
// ... existing anecdote reducer logic (addAnecdote, upvoteAnecdote, downvoteAnecdote, etc.)

// Import notification action creator (optional, for showing notifications on actions)
import { setNotification } from './notificationReducer';

// Add reducer case for showing a notification on adding an anecdote (optional)
export const reducers = {
  // ... existing anecdote reducers
  addAnecdote: (state, action) => {
    // Add anecdote logic
    dispatch(setNotification('New anecdote added!')); // Dispatch notification action (optional)
  },
  // ... other reducers
};

export const { addAnecdote, upvoteAnecdote, downvoteAnecdote, ...otherActions } = reducers; // Export all actions
export default reducers;
