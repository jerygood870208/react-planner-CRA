import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import PlannerContainer from './components/PlannerContainer';

const App = () => {
  return (
    <Provider store={store}>
      <PlannerContainer />
    </Provider>
  );
};

export default App;