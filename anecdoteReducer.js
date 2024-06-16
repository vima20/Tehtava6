import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  anecdotes: [], // Replace with initial state if needed
};

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    addAnecdote: (state, action) => {
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
            body: JSON.stringify(newAnecdote),
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
    upvoteAnecdote: (state, action) => {
      // Update upvote logic based on your backend implementation
      constupvoteAnecdote: (state, action) => {
        const id = action.payload;
        const anecdoteToChange = state.anecdotes.find((a) => a.id === id);
        if (anecdoteToChange) {
          // Update upvote logic based on your backend implementation
      
          // Here are two possible approaches depending on your backend:
          
          // Option 1: Update locally, send update to backend later (optimistic update)
          anecdoteToChange.votes++;
      
          // Option 2: Fetch updated anecdote from backend (pessimistic update)
          // This approach requires updating your backend to handle PUT requests
          // for individual anecdotes. You'd need to fetch the updated anecdote
          // and update the state accordingly.
      
          // Replace the following comment with your chosen implementation
          // console.warn('Upvote logic for backend not implemented yet');
        }
      },
      // ... other reducers (downvoteAnecdote, etc.)
      });
      
      export const { addAnecdote, upvoteAnecdote, downvoteAnecdote } = anecdoteSlice.actions;
      export default anecdoteSlice.reducer;
