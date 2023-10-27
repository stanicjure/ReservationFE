import React from "react";

const useDate = () => {
  const date = new Date();
  date.setHours(2);
  const getNumberOfDaysInMonth = (month, year) => {
    if (
      month === 0 ||
      month === 2 ||
      month === 4 ||
      month === 6 ||
      month === 7 ||
      month === 9 ||
      month === 11
    )
      return 31;
    if (month === 1) {
      if (year % 4 === 0) {
        return 29;
      } else return 28;
    }
    if (month === 3 || month === 5 || month === 8 || month === 10) return 30;
  };

  return [date, getNumberOfDaysInMonth];
};

export default useDate;
