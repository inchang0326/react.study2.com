import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "./App.css";
import "./DiaryEditor/DiaryEditor";
import DiaryEditor from "./DiaryEditor/DiaryEditor";
import DiaryEditorForUpdate from "./DiaryEditorForUpdate/DiaryEditorForUpdate";
import DiaryList from "./DiaryList/DiaryList";

function App() {
  const navi = useNavigate();
  const [diaryList, setDiaryList] = useState([]);
  const [diaryData, setDairyData] = useState(null);

  const onCreate = (newData) => {
    console.log(newData);
    setDiaryList([newData, ...diaryList]);
  };

  const onDelete = (toBeDeletedData) => {
    console.log(toBeDeletedData);
    const newDiaryList = diaryList.filter((origin) =>
      toBeDeletedData.every((data) => data !== origin.key)
    );
    console.log(newDiaryList);
    setDiaryList(newDiaryList);
  };

  const onData = (toBeUpdatedData) => {
    console.log(toBeUpdatedData);
    const diaryData = diaryList.filter((origin) => {
      return origin.key === toBeUpdatedData;
    });
    console.log(diaryData[0]);
    setDairyData(diaryData[0]);
    navi("/update");
  };

  // bug fix. 특정 한목 선택 후 다른 항목 선택 후 내용 업데이트하면, 노출되는 내용은 첫번째 것인데, 다음으로 선택한 항목이 업데이트됨.
  const onUpdate = (toBeUpdatedData, key) => {
    console.log(toBeUpdatedData);
    const newDiaryList = diaryList.filter((origin) => {
      if (origin.key === key) {
        origin.author = toBeUpdatedData.author;
        origin.contents = toBeUpdatedData.contents;
        origin.emotion = toBeUpdatedData.emotion;
      }
      origin.key = (Math.random() + 1).toString(36).substring(7); // antd table의 경우, key가 같을 경우, 내용 업데이트가 안됨.
      return true;
    });
    console.log(newDiaryList);
    setDiaryList([...newDiaryList]);
  };

  return (
    <div id="App">
      <div id="header"></div>
      <div id="body">
        <Routes>
          <Route
            path="/"
            element={<DiaryEditor onCreate={onCreate}></DiaryEditor>}
          ></Route>
          <Route
            path="/update"
            element={
              <DiaryEditorForUpdate diaryData={diaryData} onUpdate={onUpdate} />
            }
          ></Route>
        </Routes>
        <DiaryList
          diaryList={diaryList}
          onDelete={onDelete}
          onData={onData}
        ></DiaryList>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;
