import "./App.css";
import "./DiaryEditor/DiaryEditor";
import DiaryEditor from "./DiaryEditor/DiaryEditor";
import DiaryList from "./DiaryList/DiaryList";

const props = {
  diaryList: [
    {
      id: 1,
      author: "강인창",
      contents: "Hi! (1)",
      emotion: 3,
      createdAt: new Date().getTime(),
    },
    {
      id: 2,
      author: "강인창",
      contents: "Hi! (2)",
      emotion: 3,
      createdAt: new Date().getTime(),
    },
    {
      id: 3,
      author: "강인창",
      contents: "Hi! (3)",
      emotion: 3,
      createdAt: new Date().getTime(),
    },
    {
      id: 4,
      author: "강인창",
      contents: "Hi! (4)",
      emotion: 3,
      createdAt: new Date().getTime(),
    },
    {
      id: 5,
      author: "강인창",
      contents: "Hi! (5)",
      emotion: 3,
      createdAt: new Date().getTime(),
    },
  ],
};

function App() {
  return (
    <div id="App">
      <div id="header"></div>
      <div id="body">
        <DiaryEditor></DiaryEditor>
        <DiaryList {...props}></DiaryList>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;
