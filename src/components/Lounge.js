import "../styles/Main.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import Header from "./AppHeader";
import ApartmentInfo from "./ApartmentInfo";
import { useEffect, useState } from "react";
import useDate from "../hooks/useDate";

const Lounge = () => {
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const [date] = useDate();
  const [monthDisplay, setMonthDisplay] = useState();
  const [yearDisplay, setYearDisplay] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();
    const setMonthAndYear = () => {
      setMonthDisplay(date.getMonth());
      setYearDisplay(date.getFullYear());
    };

    setMonthAndYear();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  const handleMonthClick = (x) => {
    setMonthDisplay((prev) => {
      if (prev + x > 11) {
        return 0;
      } else if (prev + x < 0) {
        return 11;
      } else return prev + x;
    });
  };
  return (
    <div id="appSkelet">
      <Header />
      <span id="yearDisplay">
        <button className="noStyleButton" onClick={() => handleMonthClick(-1)}>
          <FontAwesomeIcon icon={faCaretLeft} />
        </button>

        <div id="middleYearDisplay">
          {monthNames[monthDisplay]}
          {yearDisplay}
        </div>
        <button className="noStyleButton" onClick={() => handleMonthClick(1)}>
          <FontAwesomeIcon icon={faCaretRight} />
        </button>
      </span>
      <div id="mainBody">
        <ApartmentInfo
          yearDisplay={yearDisplay}
          date={date}
          monthDisplay={monthDisplay}
        />
      </div>
    </div>
  );
};

export default Lounge;
