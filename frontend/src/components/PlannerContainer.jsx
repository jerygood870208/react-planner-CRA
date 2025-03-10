import React from 'react';
import { connect } from 'react-redux';
import ContainerDimensions from 'react-container-dimensions';
import { Plugins as PlannerPlugins, ReactPlanner } from '../react-planner';
import MyCatalog from '../catalog/mycatalog';
import ToolbarScreenshotButton from '../ui/toolbar-screenshot-button';

// 插件
const plugins = [
  PlannerPlugins.Keyboard(),
  PlannerPlugins.Autosave('react-planner_v0'),
  PlannerPlugins.ConsoleDebugger(),
];

// 工具列按鈕
const toolbarButtons = [ToolbarScreenshotButton];

const PlannerContainer = ({ plannerState }) => {
  return (
    <ContainerDimensions>
      {({ width, height }) => (
        <ReactPlanner
          catalog={MyCatalog}
          width={width}
          height={height}
          plugins={plugins}
          toolbarButtons={toolbarButtons}
          stateExtractor={() => plannerState}
        />
      )}
    </ContainerDimensions>
  );
};

// 從 Redux Store 取得 `react-planner` 的狀態
const mapStateToProps = (state) => ({
  plannerState: state.get('react-planner'),
});

export default connect(mapStateToProps)(PlannerContainer);
