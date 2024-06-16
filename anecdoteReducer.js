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
      state.anecdotes.push(newAnecdote);
    },
    upvoteAnecdote: (state, action) => {
      // Update upvote logic based on your backend implementation
      const id = action.payload;
      const anecdoteToChange = state.anecdotes.find((a) => a.id === id);
      if (anecdoteToChange) {
        anecdoteToChange.votes++;
      }
    },
    downvoteAnecdote: (state, action) => {
      // Update downvote logic based on your backend implementation
      const id = action.payload;
      const anecdoteToChange = state.anecdotes.find((a) => a.id === id);
      if (anecdoteToChange) {
        anecdoteToChange.votes--;
      }
    },
  },
});

export const { addAnecdote, upvoteAnecdote, downvoteAnecdote } = anecdoteSlice.actions;
export default anecdoteSlice.reducer;
