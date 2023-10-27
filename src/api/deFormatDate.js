import React from "react";

const deFormatDate = (x) => {
  const inputDate = new String(x);

  const year = inputDate.slice(0, 4);
  const month = inputDate.slice(5, 7);
  const day = inputDate.slice(8, 10);

  const date = new Date(year, month - 1, day);

  return date;
};
export default deFormatDate;
