import "./App.css";
import React, { useCallback, useMemo, useReducer } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import DiaryEditor from "./DiaryEditor/DiaryEditor";
import DiaryEditorForUpdate from "./DiaryEditorForUpdate/DiaryEditorForUpdate";
import DiaryList from "./DiaryList/DiaryList";

/*
    Context API: 전역적으로 컴포넌트 간 props를 주고 받기 위한 기법으로, props drilling 문제를 해결함
    Props Drilling: 예를 들어, A > B > C 처럼 계층 구조의 컴포넌트가 있다고 했을 때, C에서 A의 props를 받기 위해선, 불필요하게 B를 무조건 거쳐야 했음
*/
export const DiaryStateContext = React.createContext();
export const DiaryBehaviorContext = React.createContext();

/*
    userReducer의 Lazy Initializer Function으로, 초기 상태를 설정함
    따라서 LocalStorage에 저장된 값을 불러오는 마운트 작업을 초기에 한 번만 수행함
*/
const initializer = {
  diaryData: {
    author: "",
    contents: "",
    emotion: "",
  },
  diaryList: localStorage.getItem("data")
    ? JSON.parse(localStorage.getItem("data"))
    : [],
};

const reducer = (state, action) => {
  // as-is 상태, to-be 상태
  let retObj = {};
  switch (action.type) {
    case "CREATE":
      retObj = { ...state, diaryList: [action.newData, ...state.diaryList] };
      break;
    case "DELETE":
      retObj = {
        ...state,
        diaryList: state.diaryList.filter((origin) =>
          action.toBeDeletedData.every((it) => it !== origin.key)
        ),
      };
      break;
    case "ONDATA":
      retObj = {
        ...state,
        diaryData: state.diaryList.filter((origin) => {
          return origin.key === action.toBeUpdatedData;
        })[0],
      };
      break;
    case "UPDATE":
      retObj = {
        ...state,
        diaryList: state.diaryList.filter((origin) => {
          if (origin.key === action.key) {
            origin.author = action.toBeUpdatedData.author;
            origin.contents = action.toBeUpdatedData.contents;
            origin.emotion = action.toBeUpdatedData.emotion;
          }
          /* 
          antd table의 경우, key가 같으면 내용 업데이트가 안됨에 따라 DiaryList를 통째로 업뎃하여 굉장히 비효율적임
          그 결과 해당 메소드를 props로 받고 있는 DiaryEditorForUpdate 컴포넌트에 대한 useCallback + React.memo 최적화가 어렵고,
          게다가 어쩔수없이 props의 불변성을 위반하며 origin.key를 수정해야 함 (함수를 수행했는데 벨류와 함께 원래 키가 바뀌어있는?)
          */
          origin.key = (Math.random() + 1).toString(36).substring(7);
          return true;
        }),
      };
      break;
    default:
      return state;
  }
  // JSON.stringify 통한 객체 직렬화
  localStorage.setItem("data", JSON.stringify(retObj.diaryList));
  return retObj;
};

function App() {
  const navi = useNavigate();
  // const [현재상태, 상태변경트리거] = useReducer(상태변경행위, 초기상태)
  const [diaryState, dispatch] = useReducer(reducer, initialState);
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
  React Hooks 최적화, useCallback 사용 예시 )
  onCreate 메소드 원본을 props로 DiaryEditor 컴포넌트에 보내줘야하므로, 값을 반환하는 useMemeo가 아닌 메소드를 반환하는 useCallback을 사용해야 함
  그리고, onCreate를 props로 받고 있는 DiaryEditor 컴포넌트에서도 prevProps와 nextProps를 비교해줄 수 있도록 memo를 사용해야 함
  단, 현재 소스코드상 onCreate 전달을 위해 Context API를 사용하고 있는데, Context API는 props를 직접 전달할 수 없고 객체화해서만 전달할 수 있음
  따라서 이후 useMemo를 사용한 최적화도 진행함 그러므로 사실상 useCallback은 현재 사용성이 없음
  즉, useCallback은 메소드 단위 props를 하위 컴포넌트로 직접 전달할 때 그리고 React.memo와 함께 사용 되어야 효과적임
  */
  const onCreate = useCallback((newData) => {
    console.log("onCreate() executed");
    dispatch({ type: "CREATE", newData });
  }, []);

  // DiaryList 컴포넌트 props. onData의 navi("/update"); 로직으로 인해, DiaryList 컴포넌트에 대한 리랜더링 최적화가 어렵다.
  const onDelete = (toBeDeletedData) => {
    console.log("onDelete() executed");
    dispatch({ type: "DELETE", toBeDeletedData });
  };

  // DiaryList 컴포넌트 props. navi("/update"); 로직으로 인해, DiaryList 컴포넌트에 대한 리랜더링 최적화가 어렵다.
  const onData = (toBeUpdatedData) => {
    console.log("onData() executed");
    dispatch({ type: "ONDATA", toBeUpdatedData });
    navi("/update");
  };
  /*
  아래 Context에 useMemo 통해 최적화하고 있으므로, 사실상 callback hooks는 필요없는 듯 함
  중요 ) 글 업뎃 시, 글 작성과 다르게 DiaryEditorForUpdate 컴포넌트가 계속해서 Rerendering 되는 이유는
        diaryState가 변하기 때문임. DiaryEditorForUpdate 컴포넌트는 diaryState를 사용하고 있음.
  */
  const onUpdate = (toBeUpdatedData, key) => {
    console.log("onUpdate() executed");
    dispatch({ type: "UPDATE", toBeUpdatedData, key });
    // navi("/");
  };

  /*
  // React Hooks 최적화, useMemo 사용 예시 )
  const getDiaryAnalysis = useMemo(() => {
    const goodCnt = diaryList.filter((it) => it.emotion >= 3).length;
    const badCnt = diaryList.length - goodCnt;
    const goodRatio = (goodCnt / diaryList.length) * 100;
    return { goodCnt, badCnt, goodRatio };
  }, [diaryList.length]);
  const { goodCnt, badCnt, goodRatio } = getDiaryAnalysis;
  */

  /*
      Context API의 경우, 값과 함수 props를 직접 전달할 수 없고 객체화하여 전달해야 함
      그렇기 때문에, useMemo를 통해 객체화된 값을 memoize하여 성능을 최적화할 수 있음
  */
  const memoizedValue = useMemo(() => {
    console.log("value memorized");
    return { diaryState };
  }, [diaryState.diaryData, diaryState.diaryList]);

  const memoizedBehaviors = useMemo(() => {
    console.log("behaviors memorized");
    return { onCreate, onDelete, onData, onUpdate };
  }, []);

  return (
    <DiaryStateContext.Provider value={memoizedValue}>
      <DiaryBehaviorContext.Provider value={memoizedBehaviors}>
        <div id="App">
          <div id="body">
            <Routes>
              <Route path="/" element={<DiaryEditor></DiaryEditor>}></Route>
              <Route
                path="/update"
                element={<DiaryEditorForUpdate></DiaryEditorForUpdate>}
              ></Route>
            </Routes>
            <DiaryList></DiaryList>
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
