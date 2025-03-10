import React from 'react';
import { Provider } from 'react-redux';
import ContainerDimensions from 'react-container-dimensions';
import Immutable, { Map } from 'immutable';
import immutableDevtools from 'immutable-devtools';
import { createStore } from 'redux';

import MyCatalog from '../catalog/mycatalog';
import ToolbarScreenshotButton from '../ui/toolbar-screenshot-button';

import {
  Models as PlannerModels,
  reducer as PlannerReducer,
  ReactPlanner,
  Plugins as PlannerPlugins,
} from '../react-planner'; // react-planner

// 定義應用初始狀態
const AppState = Map({
  'react-planner': new PlannerModels.State()
});

// 定義 reducer
const reducer = (state = AppState, action) => {
    // 確保 state 是有效的
    if (!state) {
      state = AppState;
    }
  
    // 確保 'react-planner' 的狀態有效
    return state.update('react-planner', plannerState => PlannerReducer(plannerState, action));
  };

// 設置 Redux DevTools（僅在開發環境啟用）
const isProduction = process.env.NODE_ENV === 'production';
const blackList = isProduction ? [] : ['UPDATE_MOUSE_COORDS', 'UPDATE_ZOOM_SCALE', 'UPDATE_2D_CAMERA'];

if (!isProduction) {
  console.info('Environment is in development and these actions will be blacklisted', blackList);
  console.info('Enable Chrome custom formatter for Immutable pretty print');
  immutableDevtools(Immutable);
}

// 初始化 store
const store = createStore(
  reducer,
  null,
  !isProduction && window.__REDUX_DEVTOOLS_EXTENSION__ ? 
    window.__REDUX_DEVTOOLS_EXTENSION__({
      features: {
        pause: true,
        lock: true,
        persist: true,
        export: true,
        import: 'custom',
        jump: true,
        skip: true,
        reorder: true,
        dispatch: true,
        test: true,
      },
      actionsBlacklist: blackList,
      maxAge: 999999,
    }) 
    : f => f
);

// 設定插件
const plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave('react-planner_v0'),
  PlannerPlugins.ConsoleDebugger(),
];

// 設定工具列按鈕
const toolbarButtons = [
  ToolbarScreenshotButton,
];

// 建立 PlannerApp 組件
const PlannerApp = () => {
  return (
    <Provider store={store}>
      <ContainerDimensions>
        {({ width, height }) => (
          <ReactPlanner
            catalog={MyCatalog}
            width={width}
            height={height}
            plugins={plugins}
            toolbarButtons={toolbarButtons}
            stateExtractor={state => state.get('react-planner')}
          />
        )}
      </ContainerDimensions>
    </Provider>
  );
};

export default PlannerApp;
