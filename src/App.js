import { useCallback, useEffect, useMemo, useState } from "react";
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

  // JS fetch 기반 API 호출 테스트 예시 )
  // const getDataFromInternet = async () => {
  //   const res = await fetch(
  //     `https://jsonplaceholder.typicode.com/comments`
  //   ).then((res) => res.json());
  //   console.log(res);
  // };
  // useEffect(() => {
  //   getDataFromInternet();
  // }, []);

  // React Hooks 최적화 관련, useCallback 사용 예시 )
  // onCreate 메소드 원본을 props로 DiaryEditor에 보내줘야하므로, 값을 반환하는 useMemeo는 사용하면 안됨
  // onCreate를 props로 받고 있는 DiaryEditor에서도 prevProps와 nextProps를 비교해줄 수 있도록 해야 함
  const onCreate = useCallback((newData) => {
    setDiaryList((diaryList) => [newData, ...diaryList]);
  }, []);

  const onDelete = useCallback((toBeDeletedData) => {
    setDiaryList((diaryList) =>
      diaryList.filter((origin) =>
        toBeDeletedData.every((data) => data !== origin.key)
      )
    );
  }, []);

  const onData = (toBeUpdatedData) => {
    const diaryData = diaryList.filter((origin) => {
      return origin.key === toBeUpdatedData;
    })[0];
    setDairyData(diaryData);
    navi("/update");
  };

  // bug fix. 특정 한목 선택 후 다른 항목 선택 후 내용 업데이트하면, 노출되는 내용은 첫번째 것인데, 다음으로 선택한 항목이 업데이트됨.
  const onUpdate = (toBeUpdatedData, key) => {
    setDiaryList((diaryList) =>
      diaryList.filter((origin) => {
        if (origin.key === key) {
          origin.author = toBeUpdatedData.author;
          origin.contents = toBeUpdatedData.contents;
          origin.emotion = toBeUpdatedData.emotion;
        }
        origin.key = (Math.random() + 1).toString(36).substring(7); // antd table의 경우, key가 같을 경우, 내용 업데이트가 안됨.
        return true;
      })
    );
  };

  // React Hooks 최적화 관련, useMemo 사용 예시 )
  // Diary Analysis
  // const getDiaryAnalysis = useMemo(() => {
  //   const goodCnt = diaryList.filter((it) => it.emotion >= 3).length;
  //   const badCnt = diaryList.length - goodCnt;
  //   const goodRatio = (goodCnt / diaryList.length) * 100;
  //   return { goodCnt, badCnt, goodRatio };
  // }, [diaryList.length]);
  // const { goodCnt, badCnt, goodRatio } = getDiaryAnalysis;

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
        {/* <div>All Row Count : {diaryList.length}</div>
        <div>Good Emotion Count : {goodCnt}</div>
        <div>Bad Emotion Count : {badCnt}</div>
        <div>Good Emotion Ratio : {goodRatio}</div> */}
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;

// Rect Hooks 최적화 결론 : Rerendering 될 필요가 없는 컴포넌트를 찾아 rerendering 되지 않도록 최적화하자!
