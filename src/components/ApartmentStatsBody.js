import React, { useEffect, useState } from "react";
import "../styles/Stats.css";

const ApartmentStatsBody = (props) => {
  const { apartments } = props;
  const [totalStats, setTotalStats] = useState([]);

  const getTotalStats = () => {
    let totalStatsArray = new Array();
    apartments.forEach((ap) => {
      let adults = 0,
        children = 0,
        reservations = 0,
        days = 0,
        earnings = 0,
        numberOfDays = 0;

      let start,
        end = new Date();
      ap.reservations.forEach((r) => {
        start = new Date(r.start);
        if (end.getDate() === start.getDate()) numberOfDays--; // if next reservation begins when last one ended
        end = new Date(r.end);

        const currentReservationDays = Math.round(
          (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24) + 1
        );
        earnings += r.price * currentReservationDays;
        numberOfDays += currentReservationDays;
        adults += r.persons;
        children += r.children;
        reservations++;
      });
      totalStatsArray = [
        ...totalStatsArray,
        {
          apName: ap.label,
          guests: adults + children,
          adults: adults,
          children: children,
          reservations: reservations,
          days: numberOfDays,
          earnings: earnings,
        },
      ];
    });
    setTotalStats([...totalStatsArray]);
  };
  useEffect(() => {
    getTotalStats();
  }, [apartments]);

  return (
    <>
      <div id="apartmentStatsBodyContainer">
        {apartments.map((ap, index) => {
          return (
            <div
              style={
                index % 2
                  ? { backgroundColor: "rgba(200,200,200,0.8)" }
                  : { backgroundColor: "rgba(180,180,180,0.8)" }
              }
              key={ap.label}
              className="apartmentRow"
            >
              <div className="apartmentStatsBig">
                <div className="apStatsApartmentNameBody">
                  {totalStats.length !== 0 ? totalStats[index].apName : ""}
                </div>
                <div className="apStatsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].guests : ""}
                </div>
                <div className="apStatsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].adults : ""}
                </div>
                <div className="apStatsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].children : ""}
                </div>
                <div className="apStatsItemBody">
                  {totalStats.length !== 0
                    ? totalStats[index].reservations
                    : ""}
                </div>
                <div className="apStatsItemBody">
                  {" "}
                  {totalStats.length !== 0 ? totalStats[index].days : ""}
                </div>
                <div className="apStatsEarningsItemBody">
                  {totalStats.length !== 0 ? totalStats[index].earnings : ""}
                </div>
              </div>
              <div className="apartmentStatsSmall">
                {" "}
                <div className="apStatsItem">hehehe</div>
                <div className="apStatsItem">hehehe</div>
                <div className="apStatsItem">hehehe</div>
                <div className="apStatsItem">hehehe</div>
                <div className="apStatsEarningsItem">hehehe</div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ApartmentStatsBody;
