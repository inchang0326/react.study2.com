import "./DiaryList.css";
import { useState } from "react";
import { Button, message, Table } from "antd";

const DiaryList = ({ diaryList, onDelete, onData }) => {
  const columns = [
    {
      title: "No",
      dataIndex: "id",
      render: (text) => (
        <a onClick={onClick} name={text}>
          {text}
        </a>
      ),
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

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = () => {
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
    }, 1000);
  };

  const onClick = (e) => {
    onData(e.target.name);
  };

  const onSelectChange = (newSelectedRowKeys) => {
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
          onClick={onSubmit}
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
