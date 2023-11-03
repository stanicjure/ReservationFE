import React, { useEffect, useState } from "react";
import "../styles/Stats.css";

const ApartmentStatsBody = (props) => {
  const { apartments } = props;
  const [totalStats, setTotalStats] = useState([]);

  const getTotalStats = () => {
    let totalStatsArray = new Array();
    apartments.forEach((ap) => {
      let guests = 0,
        adults = 0,
        children = 0,
        reservations = 0,
        days = 0,
        earnings = 0;

      ap.reservations.forEach((r) => {
        adults += r.persons;
        children += r.children;
        reservations++;
        totalStatsArray = [
          ...totalStatsArray,
          {
            apName: ap.label,
            guests: adults + children,
            adults: adults,
            children: children,
            reservations: reservations,
            days: 0,
            earnings: 0,
          },
        ];
      });
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
            <div key={ap.label} className="apartmentRow">
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
                <div className="apStatsItemBody">hehehe</div>
                <div className="apStatsEarningsItemBody">hehehe</div>
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
