// src/redux/store.js
import { createStore } from 'redux';
import { Map } from 'immutable';
import { reducer as PlannerReducer, Models as PlannerModels } from '../react-planner';

// 初始 state
const initialState = Map({
  'react-planner': new PlannerModels.State(),
});

// 定義 reducer
const reducer = (state = initialState, action) => {
  return state.update('react-planner', plannerState => PlannerReducer(plannerState, action));
};

// 啟用 Redux DevTools
const isProduction = process.env.NODE_ENV === 'production';
const blackList = isProduction ? [] : ['UPDATE_MOUSE_COORDS', 'UPDATE_ZOOM_SCALE', 'UPDATE_2D_CAMERA'];

const store = createStore(
  reducer,
  !isProduction && window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__({
        actionsBlacklist: blackList,
        maxAge: 999999,
      })
    : f => f
);

export default store;
