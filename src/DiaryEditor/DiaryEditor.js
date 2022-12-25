import { useState } from "react";
import "./DiaryEditor.css";

const DiaryEditor = () => {
  const [state, setState] = useState({
    author: "",
    contents: "",
    emotion: "",
  });

  function onInput(e) {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  }

  function onSubmit() {
    console.log(state);
    if (!state.author || !state.contents) alert("Please input something");
  }

  return (
    <div id="DiaryEditor">
      <h2>Daily Diary</h2>
      <div>
        <span>Title</span>
        <input
          type="text"
          value={state.author}
          name="author"
          placeholder="title"
          onChange={onInput}
        ></input>
      </div>
      <div id="content-group">
        <span>Contents</span>
        <textarea
          value={state.contents}
          name="contents"
          placeholder="contents"
          onChange={onInput}
        ></textarea>
      </div>
      <div>
        <span>Emotion Score</span>
        <select value={state.emotion} name="emotion" onChange={onInput}>
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
        </select>
      </div>
      <div>
        <button onClick={onSubmit}>save</button>
      </div>
    </div>
  );
};

export default DiaryEditor;
