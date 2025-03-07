import { Catalog } from '../react-planner';

let catalog = new Catalog();

// 使用 require.context() 動態導入 Areas, Lines, Holes, 和 Items 目錄中的所有 planner-element.jsx
const requireAreas = require.context('./areas', true, /planner-element\.jsx$/);
const requireLines = require.context('./lines', true, /planner-element\.jsx$/);
const requireHoles = require.context('./holes', true, /planner-element\.jsx$/);
const requireItems = require.context('./items', true, /planner-element\.jsx$/);

// 載入並註冊 Areas 中的所有元素
requireAreas.keys().forEach((fileName) => {
  const module = requireAreas(fileName);
  for (let key in module) {
    catalog.registerElement(module[key]);
  }
});

// 載入並註冊 Lines 中的所有元素
requireLines.keys().forEach((fileName) => {
  const module = requireLines(fileName);
  for (let key in module) {
    catalog.registerElement(module[key]);
  }
});

// 載入並註冊 Holes 中的所有元素
requireHoles.keys().forEach((fileName) => {
  const module = requireHoles(fileName);
  for (let key in module) {
    catalog.registerElement(module[key]);
  }
});

// 載入並註冊 Items 中的所有元素
requireItems.keys().forEach((fileName) => {
  const module = requireItems(fileName);
  for (let key in module) {
    catalog.registerElement(module[key]);
  }
});

// 註冊 categories
// catalog.registerCategory('windows', 'Windows', [
//   requireHoles('./window').default,
//   requireHoles('./sashWindow').default,
//   requireHoles('./venetianBlindWindow').default,
//   requireHoles('./windowCurtain').default,
// ]);
// catalog.registerCategory('doors', 'Doors', [
//   requireHoles('./door').default,
//   requireHoles('./doorDouble').default,
//   requireHoles('./panicDoor').default,
//   requireHoles('./panicDoorDouble').default,
//   requireHoles('./slidingDoor').default,
// ]);

export default catalog;
