import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faXmark } from "@fortawesome/free-solid-svg-icons";

export const AddDeleteApartment = (props) => {
  const { setAddApartmentActive, addApartment } = props;
  const apNameRef = useRef();
  const [apName, setApName] = useState();
  const [apartmentsArray, setApartmentsArray] = useState([]);
  const [visible, setVisible] = useState(false);

  const appAdd = apartmentsArray.map((ap) => {
    return (
      <li key={`lista${ap}`}>
        {ap}{" "}
        <button onClick={() => removeItem(ap)} id="x" className="noStyleButton">
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </li>
    );
  });

  const apartmentsToAdd = (ap) => {
    setApartmentsArray([...apartmentsArray, ap]);
    setApName("");
    apNameRef.current.value = "";
    apNameRef.current.focus();
    setVisible(true);
  };
  const onPressEnterApartmentsToAdd = (e) => {
    if (e.key === "Enter" && apName) {
      setApartmentsArray([...apartmentsArray, apName]);
      setApName("");
      apNameRef.current.value = "";
      apNameRef.current.focus();
      setVisible(true);
    }
  };
  const removeItem = (item) => {
    const tempArr = [...apartmentsArray];
    let index = tempArr.findIndex((i) => i === item);
    if (index + 1) {
      tempArr.splice(index, 1);
      setApartmentsArray(tempArr);
      index = undefined;
      apNameRef.current.focus();
    }
  };

  const handleSubmit = () => {
    if (apartmentsArray.length !== 0) addApartment(apartmentsArray);
    else addApartment(apName);
  };

  const preventSubmit = (e) => {
    e.preventDefault();
  };
  useEffect(() => {
    apNameRef.current.focus();
  }, []);

  return (
    <div
      onKeyDown={(e) => onPressEnterApartmentsToAdd(e)}
      className="addDeleteApContainer"
    >
      <div className="addDeleteApHeader">Add New Apartment</div>
      <div className="addDeleteApBody">
        <form onSubmit={(e) => preventSubmit(e)}>
          <div className="addDeleteLabel">
            <label>
              Name:
              <input
                onChange={(e) => setApName(e.target.value)}
                ref={apNameRef}
                className="addDeleteApInput"
              ></input>
            </label>
            <button
              type="button"
              onClick={() => apartmentsToAdd(apName)}
              id="addApartment"
              className="noStyleButton"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </form>
        {visible ? (
          <div className="apartmentsToAddContainer">
            <ul id="addApsUl">{appAdd}</ul>
          </div>
        ) : (
          ""
        )}
        <button
          type="button"
          onClick={() => handleSubmit()}
          className="reservationFormSubmitButton"
        >
          Confirm
        </button>
        <button
          type="button"
          className="reservationFormExitButton"
          onClick={() => setAddApartmentActive(false)}
        >
          Exit
        </button>
      </div>
    </div>
  );
};
