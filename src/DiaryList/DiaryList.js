import "./DiaryList.css";
import { Button, message } from "antd";
import { useMemo, useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryBehaviorContext, DiaryStateContext } from "../App";
import DiaryListItems from "./DiaryListItems";

const DiaryList = () => {
  const { diaryState } = useContext(DiaryStateContext);
  const { onDelete, onData } = useContext(DiaryBehaviorContext);
  const navi = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("DiaryList Rendered");
  });

  const handleOnDelete = () => {
    if (
      !window.confirm(
        `Do you really want to delete ${selectedRowKeys} contents?`
      )
    )
      return;

    setLoading(true);

    // ajax request after empty completing
    setTimeout(() => {
      onDelete(selectedRowKeys);
      setSelectedRowKeys([]);
      setLoading(false);
      message.success("selected contents deleted !!");
      navi("/");
    }, 1000);
  };

  const handleOnData = useCallback((e) => {
    onData(e.target.name);
  }, []);

  const rowSelection = useMemo(() => {
    return {
      selectedRowKeys,
      onChange: (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
      },
    };
  }, [selectedRowKeys]);

  const hasSelected = selectedRowKeys.length > 0;

  return (
    <div id="DiaryListContainer">
      <div
        style={{
          marginBottom: 16,
        }}
      >
        <Button
          type="primary"
          onClick={handleOnDelete}
          disabled={!hasSelected}
          loading={loading}
        >
          delete
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <DiaryListItems
        rowSelection={rowSelection}
        handleOnData={handleOnData}
        diaryList={diaryState.diaryList}
      ></DiaryListItems>
    </div>
  );
};

// React Hooks 최적화, memo 커스터마이징 사용 예시 )
// memo는 객체 props 전달 시, 얕은 비교를(주소에 의한 비교) 하기 떄문에, 객체 memoization이 잘 동작하지 않는다.
// 따라서 아래 처럼 객체 props 전달 시, 깊은 비교를 할 수 있도록 커스터마이징 할 필요가 있다.
// const areEqual = (prevProps, nextProps) => {
//   return JSON.stringify(prevProps.diaryState.diaryList) === JSON.stringify(nextProps.diaryState.diaryList)
// };
// const MemoizedDiaryList = memo(DiaryList, areEqual);

export default DiaryList;
