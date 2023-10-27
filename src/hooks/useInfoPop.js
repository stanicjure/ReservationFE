import React, { useState } from "react";
import "../styles/InfoPop.css";

const useInfoPop = (props) => {
  const hideStyle = { left: "10000px" };
  const showStyle = { left: "50%" };

  const [visible, setVisible] = useState(false);
  const [item, setItem] = useState("");
  const [infoTxt, setInfoTxt] = useState("");

  const InfoPop = (
    <div className="InfoPopContainer" style={visible ? showStyle : hideStyle}>
      <div className="InfoText">
        <p id="infoMsg">{infoTxt}</p>
        <p>{item ? item : ""}</p>
      </div>

      <button
        id="okButton"
        onClick={() => {
          setVisible(false);
          setInfoTxt("");
          window.location.reload(false);
        }}
      >
        Okay
      </button>
    </div>
  );

  return [InfoPop, visible, setVisible, setItem, setInfoTxt];
};

export default useInfoPop;
