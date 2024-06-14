import { configureStore } from '@reduxjs/toolkit';
import anecdoteReducer from './reducers/anecdoteReducer'; // Assuming anecdoteReducer is defined in reducers/anecdoteReducer.js
import filterReducer from './reducers/filterReducer'; // Assuming filterReducer is defined in reducers/filterReducer.js

const store = configureStore({
  reducers: {
    anecdotes: anecdoteReducer,
    filter: filterReducer,
  },
});

export default store;
