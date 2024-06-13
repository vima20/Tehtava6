// reducer.js
import {
  GOOD,
  OK,
  BAD,
  ZERO,
  UPVOTE,
  DOWNVOTE,
  ADD_ANECDOTE,
  UPVOTE_ANECDOTE,
  DOWNVOTE_ANECDOTE,
  FILTER_ANECDOTES,
} from './actionTypes';

const initialState = {
  good: 0,
  ok: 0,
  bad: 0,
  anecdotes: [],
  filter: FILTER_ALL,
};

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOOD:
      return { ...state, good: state.good + 1 };
    case OK:
      return { ...state, ok: state.ok + 1 };
    case BAD:
      return { ...state, bad: state.bad + 1 };
    case ZERO:
      return { ...initialState };
    case UPVOTE_ANECDOTE:
      const upvotedAnecdoteId = action.payload;
      const updatedAnecdotes = state.anecdotes.map((anecdote) => {
        if (anecdote.id === upvotedAnecdoteId) {
          return { ...anecdote, votes: anecdote.votes + 1 };
        }
        return anecdote;
      });
      return { ...state, anecdotes: updatedAnecdotes };
    case DOWNVOTE_ANECDOTE:
      const downvotedAnecdoteId = action.payload;
      const updatedAnecdotes = state.anecdotes.map((anecdote) => {
        if (anecdote.id === downvotedAnecdoteId) {
          return { ...anecdote, votes: anecdote.votes - 1 };
        }
        return anecdote;
      });
      return { ...state, anecdotes: updatedAnecdotes };
    case ADD_ANECDOTE:
      const { content } = action.payload;
      const id = Math.random().toString(36).substr(2, 9);
      const newAnecdote = { id, content, votes: 0 };
      return {
        ...state,
        anecdotes: [...state.anecdotes, newAnecdote],
      };
    case FILTER_ANECDOTES:
      const filter = action.payload;
      return { ...state, filter };
    default:
      return state;
  }
};

export default counterReducer;
