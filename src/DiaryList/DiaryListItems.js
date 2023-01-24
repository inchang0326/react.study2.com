import { Table } from "antd";
import { useEffect, memo } from "react";

const DiaryListItems = ({ rowSelection, handleOnData, diaryList }) => {
  useEffect(() => {
    console.log("DiaryListItems Rendered");
  });

  const columns = [
    {
      title: "UUID",
      dataIndex: "key",
      render: (text) => (
        <a onClick={handleOnData} name={text}>
          {text}
        </a>
      ),
    },
    {
      title: "Author",
      dataIndex: "author",
    },
    {
      title: "Contetns",
      dataIndex: "contents",
    },
    {
      title: "Emotion",
      dataIndex: "emotion",
      render: (emotion) => (
        <img
          alt={`emotion${emotion}`}
          src={`emotion${emotion}.png`}
          style={{ height: "20px" }}
        ></img>
      ),
    },
    {
      title: "Created Date",
      dataIndex: "createdAt",
    },
  ];
  return (
    <div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={diaryList}
      ></Table>
    </div>
  );
};

/*
Q. diaryList는 객체라 커스터마이징 하지 않으면 얕은 비교를 하여 memoization 잘 동작하지 않을텐데 잘 된다. 그 이유는?
A. 값을 추가/변경/삭제 하는 이벤트가 발생하는게 아니기 때문에 사실상 diaryList의 memoization이 필요없는 상황이라 얕은비교만 하여도 괜찮음.
*/
const areEqual = (prevProps, nextProps) => {};

export default memo(DiaryListItems);
