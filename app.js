import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addAnecdote, upvoteAnecdote, downvoteAnecdote, filterAnecdotes } from './actions';
import AnecdoteForm from './components/AnecdoteForm';
import AnecdoteList from './components/AnecdoteList';

const App = () => {
  const [newAnecdote, setNewAnecdote] = useState('');
  const anecdotes = useSelector((state) => state.filteredAnecdotes || state.anecdotes); // Handle missing filteredAnecdotes state
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const handleAnecdoteChange = (event) => {
    setNewAnecdote(event.target.value);
  };

  const createAnecdote = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    dispatch(addAnecdote(newAnecdote));
    setNewAnecdote(''); // Clear the input field after submission
  };

  const handleUpvote = (id) => {
    dispatch(upvoteAnecdote(id));
  };

  const handleDownvote = (id) => {
    dispatch(downvoteAnecdote(id));
  };

  const handleFilterChange = (event) => {
    dispatch(filterAnecdotes(event.target.value));
  };

  // Optional: Fetch anecdotes from an API on initial render (if using API)
  // useEffect(() => {
  //   dispatch(fetchAnecdotes()); // Dispatch an action to fetch anecdotes
  // }, [dispatch]);

  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteForm
        value={newAnecdote}
        onChange={handleAnecdoteChange}
        onSubmit={createAnecdote}
      />
      <input
        value={filter}
        onChange={handleFilterChange}
        placeholder="Search..."
      />
      <AnecdoteList
        anecdotes={anecdotes}
        onUpvote={handleUpvote}
        onDownvote={handleDownvote}
      />
    </div>
  );
};

export default App;
