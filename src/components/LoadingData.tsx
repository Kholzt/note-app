import React from "react";
import loadingDataGif from "./../assets/loadingData.gif";
const LoadingData: React.FC = () => {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <img src={loadingDataGif} />
    </div>
  );
};
export default LoadingData;
