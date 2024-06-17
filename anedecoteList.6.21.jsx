import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';

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

const AnecdoteList = () => {
  const { isLoading, error, data, refetch } = useQuery('anecdotes', getAnecdotes); // Use query key for caching

  const [addAnecdoteMutation, { isLoading: adding, error: addingError }] = useMutation(addAnecdote);

  const [content, setContent] = useState('');

  const handleAddAnecdote = (event) => {
    event.preventDefault();
    addAnecdoteMutation(content);
    setContent(''); // Clear input field after submission
  };

  if (isLoading) {
    return <div>Lataa...</div>;
  }

  if (error) {
    return <div>Virhe anekdoottien hakemisessa: {error.message}</div>;
  }

  const anecdotes = data;

  if (adding) {
    return (
      <div>
        Lataa... (lisätään anekdootia)
      </div>
    );
  }

  if (addingError) {
    return <div>Virhe anekdootin lisäämisessä: {addingError.message}</div>;
  }

  return (
    <div>
      <h2>Anekdootit</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>{anecdote.content}</li>
        ))}
      </ul>
      <AddAnecdoteForm content={content} setContent={setContent} onAdd={handleAddAnecdote} />
    </div>
  );
};

const AddAnecdoteForm = ({ content, setContent, onAdd }) => {
  return (
    <form onSubmit={onAdd}>
      <label>Uusi anekdootti:</label>
      <input type="text" value={content} onChange={(event) => setContent(event.target.value)} />
      <button type="submit" disabled={content.length < 5}>
        Lisää
      </button>
    </form>
  );
};

export default AnecdoteList;
