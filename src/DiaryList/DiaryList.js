import "./DiaryList.css";
import DiaryData from "../DiaryData/DiaryData";

const DiaryList = ({ diaryList }) => {
  return (
    <div id="DiaryList">
      <div>
        <span>Diary List</span>
      </div>
      <div className="DiaryContainer">
        <div className="diary-subject">
          <div className="diary-category">
            <span>No</span>
          </div>
          <div className="diary-category">
            <span>Author</span>
          </div>
          <div className="diary-category">
            <span>Contents</span>
          </div>
          <div className="diary-category">
            <span>Emotion Score</span>
          </div>
          <div className="diary-category">
            <span>Created Time</span>
          </div>
        </div>
        <div className="diary-data-outer">
          {diaryList.map((diary) => {
            return <DiaryData key={diary.id} {...diary} />;
          })}
        </div>
      </div>
    </div>
  );
};

DiaryList.defaultProps = {
  diaryList: [],
};

export default DiaryList;
