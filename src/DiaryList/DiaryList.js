import "./DiaryList.css";
import { useState } from "react";
import { Button, Table } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const columns = [
  {
    title: "No",
    dataIndex: "key",
  },
  {
    title: "Author",
    dataIndex: "author",
  },
  {
    title: "Contents",
    dataIndex: "contents",
  },
  {
    title: "Emotion",
    dataIndex: "emotion",
  },
  {
    title: "CreatedAt",
    dataIndex: "createdAt",
  },
];

const DiaryList = ({ diaryList }) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const start = () => {
    setLoading(true);
    // ajax request after empty completing
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
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
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
        >
          Reload
        </Button>
        <span
          style={{
            marginLeft: 8,
          }}
        >
          {hasSelected ? `Selected ${selectedRowKeys.length} items` : ""}
        </span>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={diaryList}
      />
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
