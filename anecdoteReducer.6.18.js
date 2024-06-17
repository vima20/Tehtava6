import { createSlice } from '@reduxjs/toolkit';
import { fetch } from 'cross-fetch'; // Assuming you're using 'cross-fetch' for fetching

const initialState = {
  anecdotes: [], // Replace with initial state if needed
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
            dispatch(showNotification('New anecdote created!')); // Show notification (assuming notification logic exists)
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
        // Update upvote logic based on your backend implementation

        // Option 1: Update locally, send update to backend later (optimistic update)
        anecdoteToChange.votes++;

        // Option 2: Fetch updated anecdote from backend (pessimistic update)
        // This approach requires updating your backend to handle PUT requests
        // for individual anecdotes. You'd need to fetch the updated anecdote
        // and update the state accordingly.

        // Replace the following comment with your chosen implementation
        // console.warn('Upvote logic for backend not implemented yet');

        // Dispatch updateVote action to handle asynchronous vote update
        dispatch(updateVote(id));
      }
    },
    // ... other reducers (downvoteAnecdote, etc.)
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
export const updateVote = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:3000/anecdotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...state.anecdotes.find((a) => a.id === id),
        votes: state.anecdotes.find((a) => a.id === id).votes + 1, // Update votes
      }),
    });

    if (response.ok) {
      console.log('Vote updated successfully!');
    } else {
      console.error('Error updating vote:', response);
    }
  } catch (error) {
    console.error('Error updating vote:', error);
  }
};

export default anecdoteSlice.reducer;
