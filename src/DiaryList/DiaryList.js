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

// React Hooks ?????????, memo ?????????????????? ?????? ?????? )
// memo??? ?????? props ?????? ???, ?????? ?????????(????????? ?????? ??????) ?????? ?????????, ?????? memoization??? ??? ???????????? ?????????.
// ????????? ?????? ?????? ?????? props ?????? ???, ?????? ????????? ??? ??? ????????? ?????????????????? ??? ????????? ??????.
// const areEqual = (prevProps, nextProps) => {
//   return JSON.stringify(prevProps.diaryState.diaryList) === JSON.stringify(nextProps.diaryState.diaryList)
// };
// const MemoizedDiaryList = memo(DiaryList, areEqual);

export default DiaryList;
