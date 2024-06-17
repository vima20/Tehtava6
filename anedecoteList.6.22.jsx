import React, { useState } from 'react';
import { useQuery, useMutation } from 'react-query';

const getAnecdotes = async () => {
  const response = await fetch('http://localhost:3000/anecdotes'); // Replace with your server URL
  if (!response.ok) {
    throw new Error('Virhe anekdoottien hakemisessa');
  }
  return await response.json();
};

const updateVote = async (id) => {
  const response = await fetch(`http://localhost:3000/anecdotes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ votes: ++1 }), // Update vote count before sending
  });

  if (!response.ok) {
    throw new Error('Virhe anekdootin äänestämisessä');
  }

  return await response.json();
};

const AnecdoteList = () => {
  const { isLoading, error, data, refetch } = useQuery('anecdotes', getAnecdotes); // Use query key for caching

  const [updateVoteMutation, { isLoading: voting, error: votingError }] = useMutation(updateVote);

  const handleUpvote = (id) => {
    updateVoteMutation(id);
  };

  if (isLoading) {
    return <div>Lataa...</div>;
  }

  if (error) {
    return <div>Virhe anekdoottien hakemisessa: {error.message}</div>;
  }

  const anecdotes = data;

  if (voting) {
    return (
      <div>
        Lataa... (päivitetään äänestystuloksia)
      </div>
    );
  }

  if (votingError) {
    return <div>Virhe anekdootin äänestämisessä: {votingError.message}</div>;
  }

  return (
    <div>
      <h2>Anekdootit</h2>
      <ul>
        {anecdotes.map((anecdote) => (
          <li key={anecdote.id}>
            {anecdote.content} <span>({anecdote.votes} ääntä)</span>
            <button onClick={() => handleUpvote(anecdote.id)} disabled={voting}>
              Äänestä
            </button>
          </li>
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
