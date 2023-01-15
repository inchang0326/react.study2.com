import "./DiaryList.css";
import { useEffect, useState } from "react";
import { Button, message, Table } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

const DiaryList = ({ diaryList, onDelete, onData }) => {
  const navi = useNavigate();

  useEffect(() => {
    console.log("DiaryList Rendered");
  });
  const columns = [
    {
      title: "No",
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
    }, 1000);
    navi("/");
  };

  const handleOnData = (e) => {
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
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={diaryList}
      />
    </div>
  );
};
// React Hooks 최적화 관련, memo 사용 예시 )
// memo는 객체 props 전달 시, 얕은 비교를(주소에 의한 비교) 하기 떄문에, 객체 memoization이 잘 동작하지 않는다.
// 따라서 아래 처럼 객체 props 전달 시, 깊은 비교를 할 수 있도록 커스터마이징 할 필요가 있다.
// const areEqual = (prevProps, nextProps) => {
//   if (prevProps.diaryList.length != nextProps.diaryList.length) {
//     return false;
//   } else {
//     let ix = 0;
//     prevProps.diaryList.map((it) => {
//       if (
//         !(
//           it.author == nextProps.diaryList[ix].author &&
//           it.contents == nextProps.diaryList[ix].contents &&
//           it.emotion == nextProps.diaryList[ix].emotion
//         )
//       ) {
//         return false;
//       }
//       ix++;
//     });
//     return true;
//   }
// };

// const MemoizedDiaryList = React.memo(DiaryList, areEqual);

DiaryList.defaultProps = {
  diaryList: [],
};

export default React.memo(DiaryList);
