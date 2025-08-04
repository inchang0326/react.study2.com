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

export default memo(DiaryListItems);
