import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppContent from './AppContent';
import { addAnecdote, upvoteAnecdote, downvoteAnecdote } from './reducers/anecdoteReducer';
import { setFilter } from './reducers/filterReducer';
import Notification from './components/Notification'; // Assuming Notification component exists

const App = () => {
  const dispatch = useDispatch();
  const notificationMessage = useSelector((state) => state.notification.message);

  // ... rest of the App component logic

  return (
    <Provider store={store}>
      <div>
        <Notification message={notificationMessage} />
        <AppContent />
      </div>
    </Provider>
  );
};

export default App;
