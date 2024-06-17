import React from 'react';
import { useQuery } from 'react-query';

const getAnecdotes = async () => {
  const response = await fetch('http://localhost:3000/anecdotes'); // Replace with your server URL
  if (!response.ok) {
    throw new Error('Virhe anekdoottien hakemisessa');
  }
  return await response.json();
};

const AnecdoteList = () => {
  const { isLoading, error, data } = useQuery(
    {
      queryKey: ['anecdotes'],
      queryFn: getAnecdotes,
      // You can adjust retry behavior here (optional):
      // retry: false, // No retries
      // retry: 1,    // Retry once
    }
  );

  if (isLoading) {
    return <div>Lataa...</div>;
  }

  if (error) {
    return <div>Virhe anekdoottien hakemisessa: {error.message}</div>;
  }

  const anecdotes = data;

  return (
    <ul>
      {anecdotes.map((anecdote) => (
        <li key={anecdote.id}>{anecdote.content}</li>
      ))}
    </ul>
  );
};

export default AnecdoteList;
