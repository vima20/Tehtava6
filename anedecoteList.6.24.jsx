import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';
import { useReducer } from 'react';

// Notification context (provider and consumer)
const NotificationContext = React.createContext();

const initialState = {
  message: '', // Notification message
  show: false, // Whether to show the notification
  timeoutId: null, // ID of the timeout for hiding the notification
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SHOW':
      return {
        message: action.payload.message,
        show: true,
        timeoutId: action.payload.timeoutId,
      };
    case 'HIDE':
      return {
        message: '',
        show: false,
        timeoutId: null,
      };
    default:
      return state;
  }
};

const NotificationProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const showNotification = (message, timeout = 5000) => {
    const timeoutId = setTimeout(() => dispatch({ type: 'HIDE' }), timeout);
    dispatch({ type: 'SHOW', payload: { message, timeoutId } });
  };

  return (
    <NotificationContext.Provider value={{ showNotification, state }}>
      {children}
    </NotificationContext.Provider>
  );
};

const Notification = () => {
  const { state } = React.useContext(NotificationContext);

  if (!state.show) {
    return null;
  }

  return (
    <div className="notification">
      <p>{state.message}</p>
    </div>
  );
};

const getAnecdotes = async () => {
  const response = await fetch('http://localhost:3000/anecdotes'); // Replace with your server URL
  if (!response.ok) {
    throw new Error('Virhe anekdoottien hakemisessa');
  }
  return await response.json();
};

const addAnecdote = async (content) => {
  if (content.length < 5) {
    throw new Error('Anekdootin sisällön tulee olla vähintään 5 merkkiä pitkä');
  }

  const response = await fetch('http://localhost:3000/anecdotes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content }),
  });

  if (!response.ok) {
    throw new Error('Virhe anekdootin lisäämisessä');
  }

  return await response.json();
};

const updateVoteMutation = async (id) => {
  const response = await fetch(`http://localhost:3000/anecdotes/${id}/vote`);
  if (!response.ok) {
    throw new Error('Virhe anekdootin äänestämisessä');
  }
};

const AnecdoteList = () => {
  const { isLoading, error, data, refetch } = useQuery('anecdotes', getAnecdotes);
  const { showNotification, state } = React.useContext(NotificationContext);

  const [addAnecdoteMutation, { isLoading: adding, error: addingError }] = useMutation(addAnecdote);
  const [content, setContent] = useState('');

  const handleAddAnecdote = (event) => {
    event.preventDefault();
    try {
      addAnecdoteMutation(content);
      setContent(''); // Clear input field after submission
      showNotification('Uusi anekdootti lisätty!');
      refetch(); // Refetch data to update the list
    } catch (error) {
      showNotification(error.message); // Display error message
    }
  };

  const handleUpvote = (id) => {
    updateVoteMutation(id);
    showNotification('Äänestetty!');
  };

  if (isLoading) {
    return <div>Lataa...</div>;
  }

  if (error) {
    return <div>Virhe anekdoottien hakemisessa: {error.message}</div>;
  }

  const anecdotes = data; return (
    <div>
      <h2>Anekdootit</h2>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            ääniä: {anecdote.votes}
            <button onClick={() => handleUpvote(anecdote.id)}>äänestä</button>
          </div>
        </div>
      ))}
      <form onSubmit={handleAddAnecdote}>
        <input value={content} onChange={(e) => setContent(e.target.value)} />
        <button disabled={adding}>lisää</button>
        {addingError && <div>Virhe: {addingError.message}</div>}
      </form>
      {state.show && <Notification />}
    </div>
  );
};

export default AnecdoteList;
