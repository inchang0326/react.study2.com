import "./App.css";
import "./DiaryEditor/DiaryEditor";
import DiaryEditor from "./DiaryEditor/DiaryEditor";

function App() {
  return (
    <div id="App">
      <div id="header"></div>
      <div id="body">
        <DiaryEditor></DiaryEditor>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;
