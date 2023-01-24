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

  // 1. 테이블 글 선택이 달라지면, diaryData도 업뎃된다.
  useEffect(() => {
    setState(diaryState.diaryData); // 2. 그러면 setState를 통해 해당 페이지를 다시 그린다.
    // 변화하는 diaryData를 제어할 수 있음. 즉, 해당 부분에서 변화하는 state를 제어할 수 있다.
  }, [diaryState.diaryData]); // 3. 하지만 다시 그려질때의 diaryState는 달라지지 않기 때문에, 무한 콜백을 멈춘다.

  function handleOnUpdate(e) {
    onUpdate(e, diaryState.diaryData.key);
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
          { name: ["author"], value: state.author },
          { name: ["contents"], value: state.contents },
          { name: ["emotion"], value: state.emotion },
        ]}
        onFinish={handleOnUpdate}
      >
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

export default DiaryEditorForUpdate;
