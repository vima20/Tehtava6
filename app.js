import React from 'react';
import { Provider } from 'react-redux';
import store from './store'; // Import the store from store.js
import AppContent from './AppContent'; // Assuming you have an AppContent component

const App = () => {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
};

export default App;
