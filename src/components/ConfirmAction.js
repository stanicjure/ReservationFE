import React from "react";
import useInfoPop from "../hooks/useInfoPop";

export const ConfirmAction = (props) => {
  const { confirmStyle, txt, item, setItem, fnction, setFunctionToForward } =
    props;

  return (
    <>
      <div
        className="InfoPopContainer"
        id={confirmStyle ? confirmStyle : ""}
        style={{ left: "50%" }}
      >
        <p className="confirmActionText">{txt}</p> <br />
        {Array.isArray(item) ? (
          item.map((i) => {
            return (
              <>
                <div id="infoAndItem">
                  <p id="infoArrayText">{i.info}</p>
                  <p id="itemArrayText">{i.item}</p>
                </div>
              </>
            );
          })
        ) : (
          <p className="confirmItem">{item}</p>
        )}
        <div id="confirmButtons">
          <button
            id="yesBtn"
            onClick={() => {
              fnction(item);
              setItem("");
              setFunctionToForward("");
            }}
          >
            YES
          </button>
          <button id="noBtn" onClick={() => setItem("")}>
            NO
          </button>
        </div>
      </div>
    </>
  );
};
