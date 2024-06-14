import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppContent from './AppContent';
import { addAnecdote, upvoteAnecdote, downvoteAnecdote } from './reducers/anecdoteReducer'; // Import action creators

const App = () => {
  const dispatch = useDispatch(); // Get dispatch function from Redux

  const handleAnecdoteChange = (event) => {
    setNewAnecdote(event.target.value);
  };

  const createAnecdote = (event) => {
    event.preventDefault();
    dispatch(addAnecdote(newAnecdote)); // Dispatch the addAnecdote action
    setNewAnecdote('');
  };

  const handleUpvote = (id) => {
    dispatch(upvoteAnecdote(id));
  };

  const handleDownvote = (id) => {
    dispatch(downvoteAnecdote(id));
  };

  // ... rest of the App component
};

export default App;
