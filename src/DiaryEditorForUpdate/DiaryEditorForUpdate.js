import { Form, Divider, Input, Button, Select } from "antd";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./DiaryEditorForUpdate.css";

const DiaryEditorForUpdate = ({ diaryData, onUpdate }) => {
  const navi = useNavigate();
  const [state, setState] = useState(diaryData);

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
    onUpdate(e, diaryData.id);
    navi("/");
  }

  function onCancle() {
    navi("/");
  }

  return (
    <div id="DiaryEditor">
      <h1>Daily Diary</h1>
      <Form
        name="save"
        fields={[
          { name: ["author"], value: state.author },
          { name: ["contents"], value: state.contents },
          { name: ["emotion"], value: state.emotion },
        ]}
        onFinish={onSubmit}
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

DiaryEditorForUpdate.defaultProps = {
  diaryData: {
    author: "",
    contents: "",
    emotion: "",
  },
};

export default DiaryEditorForUpdate;
