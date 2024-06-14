import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  anecdotes: [],
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
      state.anecdotes.push(newAnecdote);
    },
    upvoteAnecdote: (state, action) => {
      const id = action.payload;
      const anecdote = state.anecdotes.find((a) => a.id === id);
      if (anecdote) {
        anecdote.votes++;
      }
    },
    downvoteAnecdote: (state, action) => {
      const id = action.payload;
      const anecdote = state.anecdotes.find((a) => a.id === id);
      if (anecdote) {
        anecdote.votes--;
      }
    },
    // Add more anecdote reducer cases here (e.g., editAnecdote, deleteAnecdote, etc.)
  },
});

export const { addAnecdote, upvoteAnecdote, downvoteAnecdote } = anecdoteSlice.actions; // Extract the action creators
export default anecdoteSlice.reducer; // Export the reducer
