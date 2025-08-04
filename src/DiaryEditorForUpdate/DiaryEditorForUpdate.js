import "./DiaryEditorForUpdate.css";
import { Form, Divider, Input, Button, Select, message } from "antd";
import { useEffect, useState, useContext, memo } from "react";
import { useNavigate } from "react-router-dom";
import { DiaryBehaviorContext, DiaryStateContext } from "../App";
import MyHeader from "./../Components/MyHeader";

const DiaryEditorForUpdate = () => {
  const { diaryState } = useContext(DiaryStateContext);
  const { onUpdate } = useContext(DiaryBehaviorContext);
  const navi = useNavigate();
  const [state, setState] = useState(diaryState.diaryData);

  useEffect(() => {
    console.log("DiaryEditorForUpdate Rendered");
  });

  // 1. 테이블 글을 선택하면(onData), App 컴포넌트에서 전달 받는 diaryState.diaryData가 갱신 됨
  useEffect(() => {
    setState(diaryState.diaryData); // 2. 그러면 해당 컴포넌트의 state도 갱신해야 함(매 글 선택마다 onUpdate 대상도 달라져야 하기 때문)
  }, [diaryState.diaryData]); // 3. 따라서 re-rendering 조건 의존성 배열을 diaryState.diaryData로 함 (참고: 빈 배열일 시 무한 콜백)

  function handleOnUpdate(e) {
    onUpdate(e);
    message.success("contents updated !!");
  }

  function onCancle() {
    navi("/");
  }

  function onInput(e) {
    if (typeof e != "object") {
      setState({
        ...state,
        emotion: e,
      });
    } else {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    }
  }

  // error 페이지 처리
  if (!diaryState.diaryData) {
    return;
  }

  return (
    <div id="DiaryEditor">
      <MyHeader text="Edit selected contents"></MyHeader>
      <Form
        name="save"
        fields={[
          { name: ["key"], value: state.key },
          { name: ["author"], value: state.author },
          { name: ["contents"], value: state.contents },
          { name: ["emotion"], value: state.emotion },
          { name: ["createdAt"], value: state.createdAt },
        ]}
        onFinish={handleOnUpdate}
      >
        <Form.Item hidden="true" name="key">
          <Input name="key" value={state.key} />
        </Form.Item>
        <Form.Item
          name="author"
          label={<div className="diary-label">Author</div>}
          rules={[{ required: true, message: "please input the author" }]}
        >
          <Input
            name="author"
            value={state.author}
            onChange={onInput}
            className="diary-author"
            size="large"
            placeholder="please input the author"
          />
        </Form.Item>
        <Form.Item
          name="contents"
          label={<div className="diary-label">Contents</div>}
          rules={[{ required: true, message: "please input the contents" }]}
        >
          <Input.TextArea
            name="contents"
            value={state.contents}
            onChange={onInput}
            className="diary-contents"
            size="large"
            placeholder="please input the contents"
          />
        </Form.Item>
        <Form.Item
          name="emotion"
          label={<div className="diary-label">Emotion</div>}
          rules={[
            { required: true, message: "please select an emotion score" },
          ]}
        >
          <Select
            name="emotion"
            value={state.emotion}
            onChange={onInput}
            style={{ width: 100 }}
            options={[
              {
                value: "1",
                label: "1",
              },
              {
                value: "2",
                label: "2",
              },
              {
                value: "3",
                label: "3",
              },
              {
                value: "4",
                label: "4",
              },
              {
                value: "5",
                label: "5",
              },
            ]}
          />
        </Form.Item>
        <Form.Item hidden="true" name="createdAt">
          <Input name="createdAt" value={state.createdAt} />
        </Form.Item>
        <Form.Item>
          <Button id="update-button" htmlType="submit">
            update
          </Button>
          <Button id="cancle-button" htmlType="button" onClick={onCancle}>
            cancle
          </Button>
        </Form.Item>
        <Divider />
      </Form>
    </div>
  );
};

export default memo(DiaryEditorForUpdate);
