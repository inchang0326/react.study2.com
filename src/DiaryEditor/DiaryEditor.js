import { Form, Divider, Input, Button, Select, message } from "antd";
import { useRef, useState } from "react";
import "./DiaryEditor.css";

const DiaryEditor = ({ onCreate }) => {
  const id = useRef(1);

  const [state, setState] = useState({
    author: "",
    contents: "",
    emotion: "",
  });

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

  function onSubmit(e) {
    console.log(e);
    onCreate({
      key: (Math.random() + 1).toString(36).substring(7),
      id: id.current,
      author: state.author,
      contents: state.contents,
      emotion: state.emotion,
      createdAt: new Date().getTime(),
    });
    id.current += 1;
    message.success("contents uploaded !!");
  }

  return (
    <div id="DiaryEditor">
      <h1>Daily Diary</h1>
      <Form name="save" onFinish={onSubmit}>
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
          <Button id="submit-button" htmlType="submit">
            save
          </Button>
        </Form.Item>
        <Divider />
      </Form>
    </div>
  );
};

export default DiaryEditor;
