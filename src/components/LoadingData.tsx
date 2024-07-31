import React from "react";
import loadingDataGif from "./../assets/loadingData.gif";
export default function LoadingData() {
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <img src={loadingDataGif} />
    </div>
  );
}
