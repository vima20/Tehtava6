import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Import your Redux store
import AppContent from './AppContent'; // Assuming AppContent component
import { addAnecdote, upvoteAnecdote, downvoteAnecdote } from './reducers/anecdoteReducer'; // Import anecdote actions

const App = () => {
  const dispatch = useDispatch();
  const [anecdotes, setAnecdotes] = useState([]); // State to store anecdotes

  useEffect(() => {
    fetch('http://localhost:3000/anecdotes') // Replace with your JSON Server URL
      .then((response) => response.json())
      .then((data) => setAnecdotes(data));
  }, []); // Empty dependency array to run only once on mount

  const handleAddAnecdote = (content) => {
    dispatch(createAnecdote(content));
  };

  const handleVote = (id, anecdote) => {
    dispatch(upvoteAnecdote(id)); // Assuming upvote action for now
  };

  // ... other component logic

  return (
    <Provider store={store}>
      <div>
        <AppContent anecdotes={anecdotes} onAddAnecdote={handleAddAnecdote} onVote={handleVote} />
      </div>
    </Provider>
  );
};

export default App;
