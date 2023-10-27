import React from "react";

const formatDate = (x, y) => {
  const start = new Date(x);
  const end = new Date(y);
  const startFormatMonth =
    start.getMonth() + 1 < 10
      ? `0${start.getMonth() + 1}`
      : start.getMonth() + 1;

  const endFormatMonth =
    end.getMonth() + 1 < 10 ? `0${end.getMonth() + 1}` : end.getMonth() + 1;

  const startFormatDay =
    start.getDate() < 10 ? `0${start.getDate()}` : start.getDate();

  const endFormatDay = end.getDate() < 10 ? `0${end.getDate()}` : end.getDate();

  const startFormated = `${start.getFullYear()}-${startFormatMonth}-${startFormatDay}`;
  const endFormated = `${end.getFullYear()}-${endFormatMonth}-${endFormatDay}`;

  return { startFormated, endFormated };
};
export default formatDate;
