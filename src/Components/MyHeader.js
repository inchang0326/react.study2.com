import { memo, useEffect } from "react";

const MyHeader = ({ text }) => {
  useEffect(() => {
    console.log("MyHeader Rendered");
  });

  return (
    <div>
      <h1>{text}</h1>
    </div>
  );
};

export default memo(MyHeader);
