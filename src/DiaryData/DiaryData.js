import "./DiaryData.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

const DiaryData = (diary) => {
  return (
    <div className="diary-data-inner">
      <div className="diary-category">
        <span>{diary.id}</span>
      </div>
      <div className="diary-category">
        <span>{diary.author}</span>
      </div>
      <div className="diary-category">
        <span>{diary.contents}</span>
      </div>
      <div className="diary-category">
        <span>{diary.emotion}</span>
      </div>
      <div className="diary-category">
        <span>{dayjs(diary.createdAt).format("YYYY-MM-DD HH:mm")}</span>
      </div>
    </div>
  );
};

export default DiaryData;
