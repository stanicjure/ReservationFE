import React, { useEffect, useState } from "react";

const StatsHeader = (props) => {
  const { apartments, setYearCondition } = props;
  const [yearDisplay, setYearDisplay] = useState([]);

  useEffect(() => {
    const getReservationYears = () => {
      const apartmentsArray = Array.from(apartments);
      let yearsArray = new Array();

      apartmentsArray.forEach((ap) => {
        ap.reservations.forEach((r) => {
          const start = new Date(r.start);
          const end = new Date(r.end);

          const startYear = start.getFullYear();
          const endYear = end.getFullYear();

          const foundStart = yearsArray.find(
            (element) => element === startYear
          );
          const foundEnd = yearsArray.find((element) => element === endYear);
          if (!foundStart) yearsArray.unshift(startYear);
          if (!foundEnd && foundEnd !== foundStart) yearsArray.unshift(endYear);
        });
      });
      setYearDisplay([...yearsArray]);
    };

    getReservationYears();
  }, [apartments]);

  const selectHandler = (e) => {
    setYearCondition(e.target.value);
  };

  return (
    <div id="statsHeaderContainer">
      <select id="yearSelect" onChange={(e) => selectHandler(e)}>
        <option value="alltime">All Time</option>
        {yearDisplay.map((y) => (
          <option value={y} key={y}>
            {y}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StatsHeader;
