import { createSlice } from '@reduxjs/toolkit';
import { fetch } from 'cross-fetch'; // Assuming you're using 'cross-fetch' for fetching

const initialState = {
  anecdotes: [], // Replace with initial state if needed
  notification: {
    message: '',
    duration: 5000, // Default duration in seconds
  },
};

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote: async (state, action) => {
      // Generate a new anecdote object with random ID, content, and initial vote count
      const newAnecdote = {
        id: Math.random().toString(36).substr(2, 9),
        content: action.payload,
        votes: 0,
      };

      return async (dispatch) => {
        try {
          const response = await fetch('http://localhost:3000/anecdotes', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newAnecdote), // Pass the anecdote content as payload
          });

          if (response.ok) {
            const createdAnecdote = await response.json();
            dispatch({ type: 'addAnecdote', payload: createdAnecdote }); // Dispatch addAnecdote action with the created anecdote
            dispatch(setNotification(`New anecdote '${createdAnecdote.content}' created!`, 5000)); // Show notification with default duration
          } else {
            console.error('Error creating anecdote:', response);
          }
        } catch (error) {
          console.error('Error creating anecdote:', error);
        }
      };
    },
    upvoteAnecdote: async (state, action) => {
      // Update upvote logic based on your backend implementation
      const id = action.payload;
      const anecdoteToChange = state.anecdotes.find((a) => a.id === id);
      if (anecdoteToChange) {
        // Update upvote logic on the backend using PUT request
        try {
          const response = await fetch(`http://localhost:3000/anecdotes/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ...anecdoteToChange, votes: anecdoteToChange.votes + 1 }), // Update vote count before sending
          });

          if (response.ok) {
            const updatedAnecdote = await response.json();
            // Update local state with the fetched updated anecdote
            state.anecdotes = state.anecdotes.map((a) => (a.id === updatedAnecdote.id ? updatedAnecdote : a));
            dispatch(setNotification(`You upvoted '${updatedAnecdote.content}'!`, 3000));
          } else {
            console.error('Error updating anecdote vote:', response);
          }
        } catch (error) {
          console.error('Error updating anecdote vote:', error);
          // Handle potential errors during update (optional: show error notification)
        }
      }
    },
    // You can add reducers for downvoteAnecdote, etc. following the same pattern
    setNotification: (state, action) => {
      // Update notification state with message and optional duration
      state.notification = {
        message: action.payload.message,
        duration: action.payload.duration || state.notification.duration, // Use default duration if not provided
      };
    },
    clearNotification: (state) => {
      state.notification = { message: '', duration: 5000 }; // Reset notification to defaults
    },
  },
  extraReducers: {
    initializeAnecdotes: async (dispatch) => {
      try {
        const response = await fetch('http://localhost:3000/anecdotes'); // Replace with your JSON Server URL
        const anecdotesData = await response.json();
        dispatch({ type: 'anecdotes/initializeAnecdotes', payload: anecdotesData });
      } catch (error) {
        console.error('Error fetching anecdotes:', error);
      }
    },
  },
});

// Create an async thunk action creator for updating votes
export default adecoteSlice.reducer;
