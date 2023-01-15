import "./App.css";
import React, { useState, useCallback, useMemo } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import DiaryEditor from "./DiaryEditor/DiaryEditor";
import DiaryEditorForUpdate from "./DiaryEditorForUpdate/DiaryEditorForUpdate";
import DiaryList from "./DiaryList/DiaryList";

// Context Provider를 통해 어떠한 컴포넌트든 props를 쉽게 전달할 수 있게 함으로써, 메인-하위 컴포넌트 간 발생하는 props drilling 예방
export const DiaryStateContext = React.createContext();
export const DiaryBehaviorContext = React.createContext();

function App() {
  const navi = useNavigate();
  const [diaryList, setDiaryList] = useState([]);
  const [diaryData, setDairyData] = useState(null);

  /*
  // JS fetch 기반 API 호출 테스트 예시 )
  const getDataFromInternet = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments`
    ).then((res) => res.json());
    console.log(res);
  };
  useEffect(() => {
    getDataFromInternet();
  }, []);
  */

  /*
  React Hooks 최적화 관련, useCallback 사용 예시 )
  onCreate 메소드 원본을 props로 DiaryEditor 컴포넌트에 보내줘야하므로, 값을 반환하는 useMemeo는 사용하면 안됨
  onCreate를 props로 받고 있는 DiaryEditor 컴포넌트에서도 prevProps와 nextProps를 비교해줄 수 있도록 memo를 사용해야 함
  */
  const onCreate = useCallback((newData) => {
    setDiaryList((diaryList) => [newData, ...diaryList]);
  }, []);

  const onDelete = (toBeDeletedData) => {
    setDiaryList((diaryList) =>
      diaryList.filter((origin) =>
        toBeDeletedData.every((data) => data !== origin.key)
      )
    );
  };

  /*
  setDiaryData를 diaryList 통해 해주고 있어서 diaryList 상태 관리가 어려움에 따라 
  게시글 업뎃을 위해 하나의 글 선택 시 DiaryList 컴포넌트에 대한 memo + useCallback 최적화가 어렵다.
  */
  const onData = (toBeUpdatedData) => {
    const diaryData = diaryList.filter((origin) => {
      return origin.key === toBeUpdatedData;
    })[0];
    setDairyData(diaryData);
    navi("/update");
  };

  const onUpdate = (toBeUpdatedData, key) => {
    setDiaryList((diaryList) =>
      diaryList.filter((origin) => {
        if (origin.key === key) {
          origin.author = toBeUpdatedData.author;
          origin.contents = toBeUpdatedData.contents;
          origin.emotion = toBeUpdatedData.emotion;
        }
        /* 
        antd table의 경우, key가 같으면 내용 업데이트가 안됨에 따라 DiaryList를 통째로 업뎃하여 굉장히 비효율적이다.
        그 결과 해당 메소드를 props로 받고 있는 DiaryEditorForUpdate 컴포넌트에 대한 memo + useCallback 최적화가 어렵다.
        */
        origin.key = (Math.random() + 1).toString(36).substring(7);
        return true;
      })
    );
  };
  /*
  // React Hooks 최적화 관련, useMemo 사용 예시 ) Diary Analysis
  const getDiaryAnalysis = useMemo(() => {
    const goodCnt = diaryList.filter((it) => it.emotion >= 3).length;
    const badCnt = diaryList.length - goodCnt;
    const goodRatio = (goodCnt / diaryList.length) * 100;
    return { goodCnt, badCnt, goodRatio };
  }, [diaryList.length]);
  const { goodCnt, badCnt, goodRatio } = getDiaryAnalysis;
  */

  const memoizedBehaviors = useMemo(() => {
    return { onCreate };
  }, []);

  return (
    <DiaryStateContext.Provider value={{ diaryList, diaryData }}>
      <DiaryBehaviorContext.Provider value={memoizedBehaviors}>
        <div id="App">
          <div id="header"></div>
          <div id="body">
            <Routes>
              <Route path="/" element={<DiaryEditor></DiaryEditor>}></Route>
              <Route
                path="/update"
                element={<DiaryEditorForUpdate onUpdate={onUpdate} />}
              ></Route>
            </Routes>
            <DiaryList onDelete={onDelete} onData={onData}></DiaryList>
            {/* <div>All Row Count : {diaryList.length}</div>
        <div>Good Emotion Count : {goodCnt}</div>
        <div>Bad Emotion Count : {badCnt}</div>
        <div>Good Emotion Ratio : {goodRatio}</div> */}
          </div>
          <div id="footer"></div>
        </div>
      </DiaryBehaviorContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;

// Rect Hooks 최적화 결론 : Rerendering 될 필요가 없는 컴포넌트를 찾아 rerendering 되지 않도록 최적화하자!
