import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';
import PlannerContainer from './components/PlannerContainer';
// import PlannerApp from './components/PlannerApp';

const App = () => {
  return (
    <Provider store={store}>
      <div style={{ width: '100vw', height: '100vh', display: 'flex' }}>
        <PlannerContainer />
      </div>
    </Provider>
    // <PlannerApp/>
  );
};

export default App;